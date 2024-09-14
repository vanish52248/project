// 一覧画面のコンポーネント
import * as React from 'react';

import Paper from '@mui/material/Paper';

import Header from './Header';
import '../css/Top.css';

const Top = () => {

  return (
    <>
      <Header />
      <Paper className='frame_paper'>
        ・一覧と履歴のタブを作る<br/>
        ・axiosでGETしたタスク一覧を表示する<br/>
      </Paper >
    </>
  );
}

export default Top
