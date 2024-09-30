import React, { useState } from "react";

import Paper from '@mui/material/Paper';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateMessageDialog from './UpdatelMessageDialog';
import DeleteMessageDialog from './DeleteMessageDialog';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import Header from './Header';
import CompleteSnackBar from './CompleteSnackBar';
import '../css/Top.css';


const Top = () => {

    // タスクの一覧を管理する変数
    const [taskList, setTaskList] = useState([])

    // 削除・編集メッセージダイアログ側で表示する為に渡す変数
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [id, setId] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [author, setAuthor] = React.useState("");

    // スナックバー側で表示する為に渡す変数
    const [openSnack, setOpenSnack] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("");

    // タスク取得処理
    const getAllTasks = () => {

        // BEの一覧取得APIよりタスクを取得する処理
        let taskGetListFromBE = []
        axios.get(process.env.REACT_APP_LOCAL_API_URL + '/get', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                // BEより取得したデータ数文ループさせる
                for (var i = 0; i < response.data.length; i++) {
                    taskGetListFromBE.push(response.data[i])
                }
                setTaskList(taskGetListFromBE)
            })
            .catch(error => {
                // スナックバーの制御
                setOpenSnack(true);
                setMessage(`タスクの取得に失敗しました。`);
                setSeverity("red");
            })
    }

    // 初回起動時&タスク削除・編集ダイアログが開閉したときに読み込ませたい処理
    React.useEffect(() => {
        getAllTasks();
    }, [deleteDialogOpen, updateDialogOpen])


    // 追加(+)ボタン押下時の処理
    const handleTaskCreate = () => {

        // 登録APIへ渡すデータの定義
        const reqestDataOfJson = {
            Title: "",
            Content: "",
            Author: ""
        }

        // BEの登録APIよりタスクを登録する処理
        axios.post(process.env.REACT_APP_API_URL + '/create', reqestDataOfJson, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                // BEの一覧取得APIを再読み込みして最新の一覧を取得
                getAllTasks()

                // スナックバーの制御
                setOpenSnack(true);
                setMessage("タスクの登録が完了しました。");
                setSeverity("green");
            })
            .catch(error => {
                // スナックバーの制御
                setOpenSnack(true);
                setMessage(`タスクの登録に失敗しました。`);
                setSeverity("red");
            })
    }


    // 以下2つを押下時の処理を包括した処理
    // タスク列自体を押下時の処理=>"DETAIL"
    // 削除(ごみ箱)ボタン押下時の処理=>"DELETE"
    const handleTaskDetail = (id, title, content, author, process) => {
        if (process === "DELETE") {
            setId(id)
            setTitle(title)
            setContent(content)
            setAuthor(author)
            // 削除用ダイアログを開く
            setDeleteDialogOpen(true)
        } else if (process === "DETAIL") {
            setId(id)
            setTitle(title)
            setContent(content)
            setAuthor(author)
            // 編集用ダイアログを開く
            setUpdateDialogOpen(true)
        }
    }

    return (
        <>
            <Header />
            {/* ・TODO: 一覧と履歴のタブを作る */}
            {/* タスク追加ボタン */}
            <div className="task_item_add_container">
                <AddCardRoundedIcon
                    fontSize="large"
                    className="task_item_add_button"
                    onClick={() => handleTaskCreate()}
                />
            </div>
            <Paper className='frame_paper'>
                {/* BEから取得したタスクの一覧をリアルタイム表示する */}
                <List>
                    {taskList.map((task, index) => (
                        <ListItem
                            key={`task_${index}`}
                            className="task_item"
                            onClick={() => handleTaskDetail(
                                task.ID,
                                task.Title,
                                task.Content,
                                task.Author,
                                "DETAIL"
                            )}
                            secondaryAction={
                                // タスクごとの削除ボタン
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={(event) => {
                                        // タスクの列をクリックしたときにDETAILのみ
                                        // ごみ箱ボタンを押したときにDELETEのみを実行するためには、
                                        // 以下の様にイベントの伝播を防ぐ必要がある
                                        // 具体的には、IconButtonのonClickイベントでevent.stopPropagation()を呼び出すことで、
                                        // 親要素のクリックイベントが発火しないようにできる
                                        event.stopPropagation();
                                        handleTaskDetail(
                                            task.ID,
                                            task.Title,
                                            task.Content,
                                            task.Author,
                                            "DELETE"
                                        )
                                    }}
                                >
                                    <DeleteIcon className="task_delete_icon" />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                // タイトルと作成者を2行で表示する
                                primary={task.Title}
                                secondary={`作成者: ${task.Author}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper >
            {/* タスク列自体を押下時に表示するメッセージダイアログ(更新) */}
            {updateDialogOpen ?
                <UpdateMessageDialog
                    setOpen={setUpdateDialogOpen}
                    setId={id}
                    setTitle={title}
                    setContent={content}
                    setAuthor={author}
                    // 更新後にSnackBarを表示する為に渡す
                    setOpenSnack={setOpenSnack}
                    setMessage={setMessage}
                    setSeverity={setSeverity}
                /> : ""}

            {/* 削除ボタン押下時に表示するメッセージダイアログ */}
            {deleteDialogOpen ?
                <DeleteMessageDialog
                    setOpen={setDeleteDialogOpen}
                    setId={id}
                    setTitle={title}
                    setContent={content}
                    setAuthor={author}
                    // 削除後にSnackBarを表示する為に渡す
                    setOpenSnack={setOpenSnack}
                    setMessage={setMessage}
                    setSeverity={setSeverity}
                /> : ""}
            {/* 各処理後に下部に表示するスナックバー */}
            {openSnack ?
                <CompleteSnackBar
                    setOpen={setOpenSnack}
                    setSeverity={severity}
                    setMessage={message}
                /> : ""}
        </>
    );
}
export default Top;
