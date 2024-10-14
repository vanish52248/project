// router-logic.tsx -> router.tsx -> App.tsx -> index.html
// App.tsxからルーティングするためのPathとコンポーネントを記載する
import React from 'react'

import { Routes, Route } from "react-router-dom"

import Menu from './components/Menu';
import PartyRegister from './components/PartyRegister';
import PokemonRegister from './components/PokemonRegister';
import BattleRecord from './components/BattleRecord';
import PokemonSelectionRate from './components/PokemonSelectionRate';
import Editor from './components/Editor';
import PokemonEditor from './components/PokemonEditor';
import PartyEditor from './components/PartyEditor';
import BattleRecordEditor from './components/BattleRecordEditor';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import NotTokenAuthentication from './components/NotTokenAuthentication';


// 認証されていない場合、ログインページにリダイレクトする処理
const RequireAuth = ( props: any ) => {
    const loginStatus = sessionStorage.getItem("login");
    // ローカルストレージにTrueがある(ログイン済みの場合)、渡されたコンポーネントをレンダリング
    if (loginStatus === "true") {
        return props.component;
    }
    // 未ログインの場合、ログインページへリダイレクト
    document.location = "/";
  }

// 非認証確認メソッド
const RequireNoAuth = ( props: any) => { 
    const loginStatus = sessionStorage.getItem("login");

    // 未ログインの場合、渡されたコンポーネントをレンダリング
    // ※ ログインページに適用
    if(loginStatus == null || loginStatus === "false"){
      return props.component;
    }
    // ログイン済みの場合、メニューページへリダイレクト
    document.location = "/menu";
  }


export const Path = {
    // ログイン画面
    Login: '/',
    // サインアップ画面
    SignUp: '/signup',
    // メニュー画面
    Menu: '/menu',
    // パーティー登録画面
    PartyRegister: '/party_register',
    // ポケモン登録画面
    PokemonRegister: '/pokemon_register',
    // バトル戦績画面
    BattleRecord: '/battle_record',
    // ポケモン選出率画面
    PokemonSelectionRate: '/pokemon_selection_rate',
    // 登録済みフィールド編集画面
    Editor: '/editor',
    // 登録済みポケモン管理画面
    PokemonEditor: '/pokemon_editor',
    // 登録済みパーティー管理画面
    PartyEditor: '/party_editor',
    // 登録済みパーティー管理画面
    BattleRecordEditor: '/battle_record_editor',
    // Token認証時間切れ画面
    NotTokenAuthentication: '/not_token_authentication',
    // NotFound画面
    NotFound: '/*',
};

const router = (
    <Routes>
        {/* ログイン画面 */}
        <Route path={Path.Login} element={<RequireNoAuth component={<Login />} />} />
        {/* サインアップ画面 */}
        <Route path={Path.SignUp} element={<RequireNoAuth component={<Signup />} />} />
        {/* メニュー画面 */}
        <Route path={Path.Menu} element={<RequireAuth component={<Menu />} />} />
        {/* パーティー登録画面 */}
        <Route path={Path.PartyRegister} element={<RequireAuth component={<PartyRegister />} />} />
        {/* ポケモン登録画面 */}
        <Route path={Path.PokemonRegister} element={<RequireAuth component={<PokemonRegister />} />} />
        {/* バトル戦績画面 */}
        <Route path={Path.BattleRecord} element={<RequireAuth component={<BattleRecord />} />} />
        {/* ポケモン選出率画面 */}
        <Route path={Path.PokemonSelectionRate} element={<RequireAuth component={<PokemonSelectionRate />} />} />
        {/* 登録済みフィールド編集画面 */}
        <Route path={Path.Editor} element={<RequireAuth component={<Editor />} />} />
        {/* 登録済みポケモン管理画面 */}
        <Route path={Path.PokemonEditor} element={<RequireAuth component={<PokemonEditor />} />} />
        {/* 登録済みパーティー管理画面 */}
        <Route path={Path.PartyEditor} element={<RequireAuth component={<PartyEditor />} />} />
        {/* 登録済みランクバトル戦績管理画面 */}
        <Route path={Path.BattleRecordEditor} element={<RequireAuth component={<BattleRecordEditor />} />} />
        {/* Token認証時間切れ画面 */}
        <Route path={Path.NotTokenAuthentication} element={<RequireAuth component={<NotTokenAuthentication />} />}></Route>
        {/* NotFound画面 */}
        <Route path={Path.NotFound} element={<NotFound/>}></Route>
    </Routes>
)

export default router
