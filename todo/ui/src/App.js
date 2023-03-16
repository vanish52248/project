import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { GetTask } from "./components/GetTask";
import { PostTask } from "./components/PostTask";
import { PutTask } from "./components/PutTask";

function App() {
  return (
    <>
      <h1>TODO's</h1>
      <p>
        {/* 固定で表示するTask作成ページへ遷移するリンク => <a>タグは使用しない */}
        <Link to='/post'><button>Create Of Task</button></Link>
      </p>
      <Routes >
        <Route path="/" element={<GetTask />} />
        <Route path="/post" element={<PostTask />} />
        <Route path="/put" element={<PutTask />} />
      </Routes>
      {/* 固定で表示するTOPページへ遷移するリンク => <a>タグは使用しない */}
      <br />
      <Link to='/'><button>Back To Top</button></Link>
    </>
  );
}

export default App;
