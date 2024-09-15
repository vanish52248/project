// 当ファイル src/index.jsは、public/index.htmlより呼び出されるファイル
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// index.jsは、Reactアプリケーションのエントリーポイントとして機能するファイル
// Reactアプリケーションでは、通常 index.jsからReactコンポーネントをindex.htmlファイルの<div id="root">要素にレンダリングするためのコードを記述する
// つまり npm startした後にindex.html > ../src/index.jsの順で内容を表示している
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React 18で<React.StrictMode></React.StrictMode>タグを使うと反応しないライブラリがある為 フラグメントに変更している
  <>
    <App />
  </>
);
