import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export const GetTask = () => {
	const [taskList, setTaskList] = useState([]);

	useEffect(() => {
		// 取得処理
		axios.request({
            method: 'GET',
            url: "http://localhost:8080/",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `JWT ${cookies.get('accesstoken')}`
            }
        })
		.then(response => {
			console.info("タスク取得 完了");
			const temp_list = [];
			// ★.forEach(fanction())については、無名関数という。
			// 一回しか使用しない関数の為に名前を考える作業や、グローバルオブジェクトの汚染などを防ぐ為に使用される。
			response.data.forEach(function(value, index, array){
				const temp_obj = {};
				//配列内のオブジェクトの各要素をループ
				Object.keys(array[index]).forEach(function(key) {
					temp_obj[key] = array[index][key];
					// console.info(`temp_obj:${JSON.stringify(temp_obj)}`);
				})
				temp_list.push(temp_obj);
				console.info(`temp_list:${JSON.stringify(temp_list)}`);
			})
			setTaskList(temp_list);
		})
		.catch(error => {
			console.error(error);
		})
    }, []);

	// 削除処理
	const handleDelete = (name, task_id) => {
		const msg = window.confirm(`${name}を削除しますか？`);
		if (msg) {
			axios.request({
				method: 'DELETE',
				url: `http://localhost:8080/delete/${task_id}`,
				headers: {
					'Content-Type': 'application/json',
					// 'Authorization': `JWT ${cookies.get('accesstoken')}`
				}
			})
			.then(response => {
				console.info("タスク削除 完了");
			})
			.catch(error => {
				console.error(error);
			})
		}
	}


	return (
		<>
			<h2>TODO一覧</h2>
			<table>
		<thead>
			<tr>
				<th>id</th>
				<th>作成者</th>
				<th>タスク名</th>
				<th>タスク内容</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{/* Task一覧取得をループして表示する処理 */}
			{taskList.map((element, index) => (
				<tr key={index}>
					<td>{element.TASK_ID}</td>
					<td>{element.PERSON_ID}</td>
					<td>{element.NAME}</td>
					<td>{element.DESCRIPTION}</td>
					<td>
						{/* ★画面遷移先(更新画面へ値を渡しつつ遷移)★ */}
						<Link
						 to={"/put"}
						 state={{
							update_id: element.TASK_ID,
							update_name: element.NAME,
							update_description: element.DESCRIPTION 
						}}>
							<button>
								編集
							</button>
						</Link>
					</td>
					<td>						
						<form>
							<a href="/delete"><button onClick={()=>handleDelete(element.NAME, element.TASK_ID)}>削除</button></a>
						</form>
					</td>
				</tr>
			))}
		</tbody>
	</table>
		</>
	);
};
