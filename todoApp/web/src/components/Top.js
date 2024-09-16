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
import MessageDialog from './MessageDialog';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import Header from './Header';
import '../css/Top.css';


const Top = () => {

    // タスクの一覧
    const [taskList, setTaskList] = useState([])

    // メッセージダイアログ側で表示する為に渡す変数
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [author, setAuthor] = React.useState("");

    // タスク取得処理
    const getAllTasks = () => {

        // BEの一覧取得APIよりタスクを取得する処理
        const taskGetListFromBE = []
        axios.get(process.env.REACT_APP_LOCAL_API_URL + '/get', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
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
    }

    // 初回起動時に読み込ませたい処理
    React.useEffect(() => {
        getAllTasks();
    }, [])


    // 追加(+)ボタン押下時の処理
    const handleTaskCreate = () => {

        // 登録APIへ渡すデータの定義
        const reqestDataOfJson = {
            Title: "",
            Content: "",
            Author: "" // TODO: 作成者をユーザーに設定する
        }

        // BEの登録APIよりタスクを登録する処理
        axios.post(process.env.REACT_APP_LOCAL_API_URL + '/create', reqestDataOfJson, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                // BEの一覧取得APIを再読み込みして最新の一覧を取得
                console.log(response);
                getAllTasks()
            })
    }


    // 削除(ごみ箱)ボタン押下時の処理
    const handleTaskDelete = (title, content, author) => {
        setTitle(title)
        setContent(content)
        setAuthor(author)
        setOpen(true)
    }

    return (
        <>
            <Header />
            <Paper className='frame_paper'>
                {/* ・TODO: 一覧と履歴のタブを作る */}
                {/* タスク追加ボタン */}
                <div className="task_item_add_container">
                    <AddCardRoundedIcon
                        fontSize="large"
                        className="task_item_add_button"
                        onClick={() => handleTaskCreate()}
                    />
                </div>
                {/* BEから取得したタスクの一覧をリアルタイム表示する */}
                <List>
                    {taskList.map((task, index) => (
                        <ListItem
                            key={`task_${index}`}
                            className="task_item"
                            secondaryAction={
                                // タスクごとの削除ボタン
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleTaskDelete(task.Title, task.Content, task.Author)}
                                >
                                    <DeleteIcon className="task_delete_icon" />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    {/* TODO: DBに登録する値毎に表示する画像を変える?など画像に一工夫する */}
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
            {/* 削除ボタン押下時に表示するメッセージダイアログ */}
            {open ?
                <MessageDialog
                    setOpen={setOpen}
                    setTitle={title}
                    setContent={content}
                    setAuthor={author}
                /> : ""}
        </>
    );
}
export default Top;
