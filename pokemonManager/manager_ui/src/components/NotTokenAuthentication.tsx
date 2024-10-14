// トークン認証時間切れコンポーネント

import React from 'react'
import { Link } from "react-router-dom"

const NotTokenAuthentication = () => {
  return (
    <>
      <h1>401</h1>
      <p>トークン認証の時間が切れました。再度ログインして下さい。</p>
      {/* 先にセッションストレージからloginキーを削除する */}
      {sessionStorage.removeItem("login")}
      <Link to='/'>ログイン画面へ</Link>
    </>
  )
}

export default NotTokenAuthentication
