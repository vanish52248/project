// パーティー選択のプルダウンのコンポーネント
import * as React from 'react';
import { useEffect } from 'react';

import axios from 'axios';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';
import { Tooltip, Typography } from '@mui/material';
// ①ユニバーサルクッキーをインポート
import Cookies from 'universal-cookie';
import CachedIcon from '@mui/icons-material/Cached';

import { RoutingLogic } from '../logic/router-logic';
import '../css/PartySelect.css';


export default function PartySelect(props: any) {
  // DBから取得した登録済みパーティー名を格納する配列
  const [partyList, setPartyList] = React.useState<any[]>([]);
  // ②cookieを取得するインスタンスの作成
  const cookies = new Cookies();

  const router = RoutingLogic()

  // トークン認証時間切れの処理
  const toNotTokenAuthentication = () => {
    router.toNotTokenAuthentication();
  }

  // ダイアログオープン時に毎回最初に起動させる処理
  useEffect(() => {
    getPartyList()
  },[])

  // グリッド内の値を初期化する処理
  const initialGrid = () => {
    props.setCurrentSelectPokemon1();
    props.setCurrentSelectPokemon2();
    props.setCurrentSelectPokemon3();
    props.setCurrentSelectPokemon4();
    props.setCurrentSelectPokemon5();
    props.setCurrentSelectPokemon6();
  }
    
  // プルダウンを切り替えた時のパーティー取得処理
  const handleChange = (event: any) => {
    // ③axios.get()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
    axios.get(process.env.REACT_APP_API_URL + 'v1/party_name_pokemon/', {
      params: {
        party_name: event.target.value,
      },
      // ④header情報にcookieのアクセストークンを載せて通信する
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    })
    .then(response=>{
      // パーティー切り替え前にグリッドを全て初期化する
      initialGrid();
      response.data.records.forEach((element: any, index: number) => {
        // ループ前の配列を分解して新たにループ後のパーティー名を一つずつ格納する
        if (index === 0) {
          props.setCurrentSelectPokemon1(element.poke_name_id);
        } else if (index === 1) {
          props.setCurrentSelectPokemon2(element.poke_name_id);
        } else if (index === 2) {
          props.setCurrentSelectPokemon3(element.poke_name_id);
        } else if (index === 3) {
          props.setCurrentSelectPokemon4(element.poke_name_id);
        } else if (index === 4) {
          props.setCurrentSelectPokemon5(element.poke_name_id);
        } else if (index === 5) {
          props.setCurrentSelectPokemon6(element.poke_name_id);
        }
      })
    })
    .catch(error=>{
      // Token認証時間切れ時の処理→ログイン画面へ遷移
      if (error.response.status === 401){
        toNotTokenAuthentication();
      } else {
        window.console.error(`axios-FAILED:${error}`);
      }
    })
  };

  const party_reload = () => {
    window.location.reload();
  }

  // 登録済みパーティー一覧をDBから取得する処理
  const getPartyList = () => {
    // ③axios.get()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
    axios.get(process.env.REACT_APP_API_URL + 'v1/party_list/', {
      // ④header情報にcookieのアクセストークンを載せて通信する
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
       }
    })
    .then(response=>{
      // 重複がない値のみを格納する配列
      const uniqueList: any[] = [];
      response.data.records.forEach((element: any) => {
        // ループごとの現在のパーティー名を設定する変数
        const currentValue = element.party_name;
        // 重複がない値ならループ前の配列を分解して新たにループ後のパーティー名を一つずつ格納する
        if (!uniqueList.includes(currentValue)) {
          uniqueList.push(currentValue);
          setPartyList((prevState) => ([ ...prevState, element.party_name ]));
        }
      })
    })
    .catch(error=>{
      // Token認証時間切れ時の処理→ログイン画面へ遷移
      if (error.response.status === 401){
        toNotTokenAuthentication();
      } else {
        window.console.error(`axios-FAILED:${error}`);
      }
    })
  }
  

  return (
    <div className='party_select_wrapper'>
      <FormControl sx={{ m: 1, minWidth: 500 }} >
        <InputLabel id="demo-simple-select-autowidth-label">パーティー選択</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChange}
          autoWidth
          label="パーティー選択"
        >
          <MenuItem value="">
            <em>未選択</em>
          </MenuItem>
          {/* Party名をDBから取得する */}
          {partyList.map((element: string, index: number) => (
            <MenuItem
              value={element} 
              key={index}
              onChange={(e)=>handleChange(e)}
            >
            {element}
            </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Tooltip title={<Typography style={{ fontSize: "15px" }}>パーティー情報を更新する</Typography>}>
        <CachedIcon
          fontSize='large'
          className='reload_icon'
          onClick={party_reload}
          />
      </Tooltip>
    </div>
  );
}
