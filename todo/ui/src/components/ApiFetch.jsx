import React, { useState, useEffect } from "react";

export const ApiFetch = () => {
	const [person, setPerson] = useState([]);

	useEffect(() => {
		// APIをfetchする(呼び出す)
		fetch("http://localhost:8080/", { method: "GET" })
			// レスポンスのデータ形式をjsonに設定
			.then((res) => res.json())
			// APIから渡されるレスポンスデータ(data)をstateにセットする
			.then((data) => {
				setPerson(data);
			});
	}, []);

	return (
		<div>
			<ul>
				<li>ID:{person.person_id}</li>
				<li>名前:{person.name}</li>
			</ul>
		</div>
	);
};
