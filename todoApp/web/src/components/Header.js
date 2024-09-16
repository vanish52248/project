// ヘッダーのコンポーネント
import React from 'react';

import '../css/Header.css';
import RoutingLogic from '../logic/router-logic';
import SvgIcon from '@mui/material/SvgIcon';

const Header = () => {
  const router = RoutingLogic();

  // ホームアイコンクリック時にメニュー画面へ遷移する処理
  const toTop = () => {
    router.toTop();
  }

  // HomeIconを表示させるPATH
  const HomeIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <>
      <div className="header_wrapper">
        <div>
          <HomeIcon
            className="home_icon"
            fontSize="large"
            onClick={toTop} />
        </div>
        <div >
          {/* 現在のユーザー名を表示する */}
          <p className='user_container'>User: <span className='user_name'>ユーザー名</span></p>
        </div>
      </div>
    </>
  )
};

export default Header;
