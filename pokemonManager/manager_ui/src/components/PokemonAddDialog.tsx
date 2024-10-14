// パーティー登録画面のポケモン登録ボタンのダイアログのコンポーネント
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// ①ユニバーサルクッキーをインポート
import Cookies from 'universal-cookie';

import { RoutingLogic } from '../logic/router-logic';

export default function PokemonAddDialog(props: any) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // DBから取得した登録済みポケモンを格納する配列
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    // ②cookieを取得するインスタンスの作成
    const cookies = new Cookies();

    const router = RoutingLogic()

    // トークン認証時間切れの処理
    const toNotTokenAuthentication = () => {
      router.toNotTokenAuthentication();
    }  

    // ダイアログオープン時に毎回最初に起動させる処理
    useEffect(() => {
    getPokemonList()
    },[])
    
    // 登録済みポケモン一覧をDBから取得する処理
    const getPokemonList = () => {
      // ③axios.get()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
      axios.get(process.env.REACT_APP_API_URL + 'v1/pokemon_list/', {
        // ④header情報にcookieのアクセストークンを載せて通信する
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${cookies.get('accesstoken')}`
        }
      })
      .then(response=>{
        response.data.records.forEach((element: any) => {
          // ループ前の配列を分解して新たにループ後のポケモン名を一つずつ格納する
          setPokemonList((prevState) => ([ ...prevState, element.poke_name ]));
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

    // ダイアログ内のポケモンが選択された際の非同期登録処理
    // クリックされたグリッド番号ごとに登録するstateを分岐
    const handleChange = async (event: any) => {
      // awaitでグリッドの値を空にしてから値を更新する
      if (props.gridNo === 0) {
        await props.setCurrentSelectPokemon1();
        props.setCurrentSelectPokemon1(event.target.outerText);
      } else if (props.gridNo === 1) {
        await props.setCurrentSelectPokemon2();
        props.setCurrentSelectPokemon2(event.target.outerText);
      } else if (props.gridNo === 2) {
        await props.setCurrentSelectPokemon3();
        props.setCurrentSelectPokemon3(event.target.outerText);
      } else if (props.gridNo === 3) {
        await props.setCurrentSelectPokemon4();
        props.setCurrentSelectPokemon4(event.target.outerText);
      } else if (props.gridNo === 4) {
        await props.setCurrentSelectPokemon5();
        props.setCurrentSelectPokemon5(event.target.outerText);
      } else if (props.gridNo === 5) {
        await props.setCurrentSelectPokemon6();
        props.setCurrentSelectPokemon6(event.target.outerText);
      }
      props.setOpen(false);
    }
    
    // ダイアログ内のキャンセルボタンをクリック時にPartyGridのsetOpenの値をfalseに変更する処理
    const handleClose = () => {
      props.setOpen(false);
    };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        // PartyGrid内のAddIconクリック時のpropsを受け取りダイアログを表示
        open={props.setOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          登録済みポケモン一覧
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <FormControl sx={{ m: 1, minWidth: 200}}>
              {/* DBから取得した登録済みポケモン一覧を名前昇順でダイアログ内に表示する */}
              {pokemonList.sort().map((element: string, index: number) => (
                <MenuItem
                 value={element} 
                 key={index}
                 onClick={(e)=>handleChange(e)}
                 >
                {element}
                </MenuItem>
              ))}
          </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
