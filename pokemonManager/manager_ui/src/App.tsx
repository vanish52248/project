import React from 'react';
import { BrowserRouter } from "react-router-dom"
import router from './router';

function App() {
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
