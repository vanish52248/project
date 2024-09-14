// 当ファイル src/App.jsは、./index.jsより呼び出されるファイル
import React from 'react';
import { BrowserRouter } from "react-router-dom"
import router from './router';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter >
      {/* routerで各コンポーネントのルーティングをまとめている */}
        {router}
      </BrowserRouter>
    </div>
  );
}

export default App;
