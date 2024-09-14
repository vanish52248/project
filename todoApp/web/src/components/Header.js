// ヘッダーのコンポーネント
import React from 'react';

import { Tooltip, Typography } from '@mui/material';

import '../css/Header.css';
import RoutingLogic from '../logic/router-logic';
import HomeIcon from '../images/to_home.png';

const Header = () => {
  const router = RoutingLogic();
  // ホームアイコンクリック時にメニュー画面へ遷移する処理
  const toTop = () => {
    router.toTop();
  }

  return (
    <>
      <div className="header_wrapper">
        <div onClick={toTop}>
          <Tooltip title={<Typography style={{ fontSize: "15px" }}>TOP画面へ</Typography>}>
            <img src={HomeIcon} style={{ width: "35px", cursor: "pointer" }} />
          </Tooltip>
        </div>
        <div >
          {/* 現在のユーザー名を表示する */}
          <p className='user_container'>user: <span className='user_name'>ユーザー名</span></p>
        </div>
      </div>
    </>
  )
};

export default Header;
