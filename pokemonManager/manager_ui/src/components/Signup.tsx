// アカウント作成のコンポーネント
import React, { useState } from 'react'

import axios from 'axios';
import { useCookies } from 'react-cookie';
// ①ユニバーサルクッキーをインポート
import Cookies from 'universal-cookie';
// 入力フォーム用のインポート
import { useForm } from "react-hook-form";

import { RoutingLogic } from '../logic/router-logic';
import SnackBar from './SnackBar';
import '../css/SignUp.css';

// フォームをリセットするための定義
interface UseFormInputs {
    username: string
    password: string
  }
  

const Signup = () => {
    const router = RoutingLogic();
    // 未使用でも2つ定義する必要あり
    const [cookies, setCookie] = useCookies();
    // 入力したフォームの内容
    const { register, handleSubmit, reset } = useForm<UseFormInputs>();
    // スナックバーに表示するメッセージの変数
    const [messageState, setMessage] = useState<any>("");
    // スナックバーの色を判定する変数
    const [severity, setSeverity] = useState<any>("");
    // スナックバーの開閉を判定する変数
    const [openSnack, setOpenSnack] = React.useState<boolean>(false);

    // キャンセルボタンクリック時の処理
    const toLogin = () => {
        router.toLogin();
    }

    // トークン認証時間切れの処理
    const toNotTokenAuthentication = () => {
        router.toNotTokenAuthentication();
    }

    // 登録ボタンクリック時の処理
    const getJwt = async (data: any) => {
        if (window.confirm("入力した情報でアカウントを新規登録しますか。")) {
            await axios.post(process.env.REACT_APP_API_URL + 'v1/auth/jwt/create/',
                {
                    // アカウント作成時のクッキーの作成は管理者のadminで行うようにする(401対策)
                    username: "admin",
                    password: "admin123",
                },
            )
                .then(response => {
                    // 開発者ツールのcookiesに"accesstoken"と"refreshtoken"の値がセットされる(無いとBE API取得時に401になる)
                    setCookie('accesstoken', response.data.access, { path: '/' });
                    setCookie('refreshtoken', response.data.refresh, { path: '/' });
                    // APIにデータを渡してアカウントを登録する  
                    accountRegister(data.username, data.password);
                })
                .catch(error => {
                    // Token認証時間切れ時の処理→ログイン画面へ遷移
                    if (error.response.status === 401){
                        toNotTokenAuthentication();
                    } else {  
                        // error.response.dataの中にAPIからraiseしてきたJSONの値が格納されている
                        window.console.error(`axios-FAILED1:${JSON.stringify(error.response.data.error_message)}`);
                    }
                });
        } else {
            alert("登録をキャンセルしました。");
            router.toSignUp()
        }
    };

    // クッキー登録後にアカウントを登録する処理
    const accountRegister = (username: any, password: any) => {
        // ②cookieを取得するインスタンスの作成
        const cookies = new Cookies();
        // ③axios.post()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
        axios.post(process.env.REACT_APP_API_URL + 'v1/account_register/',
            {
                username: username,
                password: password,
            }, {
            // ④header情報にcookieのアクセストークンを載せて通信する
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${cookies.get('accesstoken')}`
            }
        })
            .then(response => {
                setOpenSnack(true);
                setSeverity("success");
                setMessage("アカウントの新規登録が完了しました。");
                // アカウント登録後に入力フォームをリセットする処理
                reset();
            })
            .catch(error => {
                // Token認証時間切れ時の処理→ログイン画面へ遷移
                if (error.response.status === 401){
                    toNotTokenAuthentication();
                } else {  
                    // error.response.dataの中にAPIからraiseしてきたJSONの値が格納されている
                    window.console.error(`axios-FAILED2:${JSON.stringify(error.response.data.error_message)}`);
                    setOpenSnack(true);
                    setSeverity("error");
                    setMessage(error.response.data.error_message);
                }
            })
    }

    return (
        <>
            {/* スナックバーの開閉処理 */}
            {openSnack ?
                <SnackBar
                    severity={severity}
                    setSeverity={setSeverity}
                    message={messageState}
                    setMessage={setMessage}
                    setOpen={setOpenSnack}
                /> : ""}
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit(getJwt)}>
                        <h1>Create an account</h1><br />
                        <input type="text" placeholder="username" autoFocus required {...register('username')} />
                        <input type="password" placeholder="password" {...register('password', { required: true })} required />
                        <div className='signup_button_container'>
                            <button className="cancel_button" onClick={toLogin}>キャンセル</button>
                            <button>登録</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup
