import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*
     <React.StrictMode>は意図しない副作用の検出のために、Appコンポーネントを2回呼び出している。
     コメントアウトを外すとget時のuseEffectにて2回呼ばれることが分かる
  */
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
