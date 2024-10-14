// 404ページコンポーネント

import React from 'react'
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <p>お探しのページが見つかりませんでした。</p>
      {/* ログイン済み → メニュー画面へ遷移 */}
      {/* 未ログイン → ログイン画面へ遷移 */}
      {sessionStorage.getItem("login") === "true" ? 
      <Link to='/menu'>メニュー画面へ</Link> :
      <Link to='/'>ログイン画面へ</Link>
    }
    </>
  )
}

export default NotFound
