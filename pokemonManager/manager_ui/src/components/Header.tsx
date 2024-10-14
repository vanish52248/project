// ヘッダーのコンポーネント
import React from 'react';

import { Tooltip, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';

import '../css/Header.css';
import { RoutingLogic } from '../logic/router-logic';
import HomeIcon from '../images/monster_ball.png';
import LogoutIcon from '../images/logout.png';

const Header = () => {
  const router = RoutingLogic();
  // 未使用でも3つ定義する必要あり
  const [cookies, setCookie, removeCookie] = useCookies();

  // ホームアイコンクリック時にメニュー画面へ遷移する処理
  const toMenu = () => {
    router.toMenu();
  }

  // ログアウトアイコンクリック時にログアウトする処理
  const doLogout = () => {
    // ログアウトしたらログイン判定用のセッションストレージからloginキーを削除する
    sessionStorage.removeItem("login");
    // ログアウトしたらセッションストレージから現在のユーザー名を削除する
    sessionStorage.removeItem("username");
    // 開発者ツールのcookiesから"accesstoken"と"refreshtoken"の値を削除する
    removeCookie('accesstoken', { path: '/' });
    removeCookie('refreshtoken', { path: '/' });
    router.toLogin();
  }

  return (
    <>
      <div className="header_wrapper">
        <div onClick={toMenu}>
          <Tooltip title={<Typography style={{ fontSize: "15px" }}>メニュー画面へ戻る</Typography>}>
            <img src={HomeIcon} style={{ width: "35px", cursor: "pointer" }} />
          </Tooltip>
        </div>
        <div >
          {/* 現在のユーザー名をセッションストレージから取得して表示する */}
          <p className='user_container'>user:<span className='user_name'>{sessionStorage.getItem("username")}</span></p>
        </div>
        <div onClick={doLogout} className="logout_mark">
          <Tooltip title={<Typography style={{ fontSize: "15px" }}>ログアウトする</Typography>}>
            <img src={LogoutIcon} style={{ width: "35px", cursor: "pointer" }} />
          </Tooltip>
        </div>
      </div>
    </>
  )
};

export default Header;
