// 404ページコンポーネント

import React from 'react'
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <h1>404 Page Not Found</h1>
      <p>お探しのページが見つかりませんでした。</p>
      <Link to='/top'>一覧画面へ</Link>
    </>
  )
}

export default NotFound
