// router-logic.tsx -> router.tsx -> App.tsx -> index.html
// App.tsxからルーティングするためのPathとコンポーネントを記載する
import React from 'react'

import { Routes, Route } from "react-router-dom"

import Top from './components/Top';
import NotFound from './components/NotFound';


export const Path = {
    // 一覧画面
    Top: '/top',
    // NotFound画面
    NotFound: '/*',
};

const router = (
    <Routes>
        {/* 一覧画面 */}
        <Route path={Path.Top} element={<Top/>}></Route>
        {/* NotFound画面 */}
        <Route path={Path.NotFound} element={<NotFound/>}></Route>
    </Routes>
)

export default router
