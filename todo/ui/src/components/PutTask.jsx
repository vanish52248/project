import React, {useState} from 'react'
import axios from 'axios'; 

// 遷移元から値を受け取るのに必要なライブラリ
import { useLocation } from "react-router-dom";


export const PutTask = () => {
    
    // 一覧画面の遷移元から渡ってきたid/名前/説明の値を受け取る
    /*
     更新後には値を受け取らずに画面遷移する為、
     location.state の中身は nullになるのでエラーを防ぐために3項演算子で空文字に変更
    */
    const location = useLocation();
    const { update_id } = location.state === null ? "" : location.state;
    const { update_name } = location.state === null ? "" : location.state;
    const { update_description } = location.state === null ? "" : location.state;

    // 画面遷移時に入力フォームに、データを表示する為、一覧画面から受け取った値を初期値とする
    const [name, setName] = useState(update_name);
    const [description, setDescription] = useState(update_description);

    const nameChange = (event) => {
        setName(() => event.target.value);
    };

    const descriptionChange = (event) => {
        setDescription(() => event.target.value);
    };

    const taskPut = () => {
        // 名前は必須カラムとしてrequired属性を<input>タグにつけているので入力欄が空以外のみ更新を書けるようにする
        if (name !== "") {
            axios.request({
                method: 'PUT',
                url: `http://localhost:8080/put/${update_id}`,
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
                console.info("タスク更新 完了");
            })
            .catch(error => {
                console.error(error);
            })
        }
    }


  return (
    <>
        <h2>TODO更新</h2>
        <form>
            <label htmlFor="name">タスク名</label><br/>
            <input id="name" type="text" required value={name} onChange={nameChange}/><br /><br/>

            <label htmlFor="description">説明</label><br/>
            <textarea id="description" value={description} onChange={descriptionChange} rows="5" cols="32" /><br/>
            <input type="submit" onClick={taskPut} value="更新する"/><br/><br/>
        </form>
    </>
  )
};
