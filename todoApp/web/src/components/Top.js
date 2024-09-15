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
import Header from './Header';
import '../css/Top.css';


const Top = () => {

    // タスクの一覧
    const [taskList, setTaskList] = useState([])

    // タスク取得処理
    const getTasks = () => {

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
        getTasks();
    }, [])

    return (
        <>
            <Header />
            <Paper className='frame_paper'>
                ・TODO: 一覧と履歴のタブを作る<br />
                {/* BEから取得したタスクの一覧をリアルタイム表示する */}
                <List>
                    {taskList.map((task, index) => (
                        <ListItem
                            key={`task_${index}`}
                            className="task_item"
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon 
                                    className="task_delete_icon"
                                    />
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
        </>
    );
}
export default Top;
