import React, {useState} from 'react'

import axios from 'axios';

export const PostTask = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const nameChange = (event) => {
        setName(() => event.target.value);
    };

    const descriptionChange = (event) => {
        setDescription(() => event.target.value);
    };


    const taskPost = () => {
        // 必須フィールドの名前のinputに未入力であれば送信しない
        if (name !== "") {
            axios.request({
                method: 'POST',
                url: "http://localhost:8080/post",
                params: {
                    // BE側でモデルとしてパラメータを受け取るのでTask.javaのカラム名と同名のパラメータを渡す
                    name: name,
                    description: description,
            },
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `JWT ${cookies.get('accesstoken')}`
            }
        })
        .then(response => {
            console.info("タスク作成 完了");
        })
        .catch(error => {
            console.error(error);
        })
    }}
    
    return (
        <>
        <h2>TODO作成</h2>
        <form>
            <label htmlFor="name">タスク名</label><br/>
            <input id="name" type="text" required onChange={nameChange}/><br /><br/>

            <label htmlFor="description">説明</label><br/>
            <textarea id="description" onChange={descriptionChange} rows="5" cols="32" /><br/>
            <input type="submit" onClick={taskPost} value="作成する" /><br/><br/>
        </form>
        </>

  )
}
