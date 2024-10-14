// ログインコンポーネント
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from "react-hook-form";

import { RoutingLogic } from '../logic/router-logic';
import '../css/Login.css';
import HomeIcon from '../images/monster_ball.png';


const Login = (props: any) => {
    const router = RoutingLogic()

    // 未使用でも2つ定義する必要あり
    const [cookies, setCookie] = useCookies();
    const { register, handleSubmit } = useForm();

    // ログインボタンクリック時の処理
    const getJwt = async (data: any) =>{
        await axios.post(process.env.REACT_APP_API_URL + 'v1/auth/jwt/create/',
          {
            // 入力されたフォームのユーザー名とパスワードでクッキーを作成
            username:data.username,
            password:data.password,
          },
        )
        .then(function (response) {
          // 開発者ツールのcookiesに"accesstoken"と"refreshtoken"の値がセットされる(無いとBE API取得時に401になる)
          setCookie('accesstoken', response.data.access, { path: '/' });
          setCookie('refreshtoken', response.data.refresh, { path: '/' });
          // 認証トークンをローカルストレージに保存(FEログイン遷移判定用)
          sessionStorage.setItem("login", "true");
          // 現在のログインしたユーザー名をセッションストレージに保存(ヘッダー表示用)
          sessionStorage.setItem("username", data.username);
          // ログインが成功したらメニュー画面へ遷移
          router.toMenu();
        })
        .catch(err => {
            console.error("ログイン失敗");
            alert("ユーザー名かパスワードが違います");
        });
      };

      // アカウント作成ボタンクリック時のサインアップ処理
      const toSignUp = () => {
        router.toSignUp();
      }

    return (
      <div className="login-page">
      <div className="form">
        <h1>
          <span><img src={HomeIcon} style={{ width: "25px",  transform:"rotate(20deg)"}} /></span>
          &nbsp;PokemonManager
        </h1><br />
        <form className="login-form" onSubmit={handleSubmit(getJwt)}>
          <input type="text" placeholder="username" autoFocus required {...register('username')}/>
          <input type="password" placeholder="password" {...register('password', { required: true })} required/>
          <button>ログイン</button>
          <p className="message">Not registered? <a onClick={toSignUp}>Create an account</a></p>
        </form>
      </div>
    </div>
    );
  }

  export default Login;
