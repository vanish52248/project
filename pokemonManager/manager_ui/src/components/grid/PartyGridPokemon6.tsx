// // グリッドごと(*6)に表示するポケモン情報のコンポーネント
import React, { useState, useEffect } from 'react'

import axios from 'axios'
// ①ユニバーサルクッキーをインポート
import Cookies from 'universal-cookie';
import { RoutingLogic } from '../../logic/router-logic';

import '../../css/PartyGridPokemon.css';

const PartyGridPokemon6 = (props: any) => {
    // DBから取得したダイアログごとに表示するポケモン情報を格納する配列
    const [pokemonValueList, setPokemonValueList] = useState<any>([]);
    // ②cookieを取得するインスタンスの作成
    const cookies = new Cookies();

    const router = RoutingLogic()

    // ダイアログからポケモン情報取得時に毎回最初に起動させる処理
    useEffect(() => {
        getPokemonList()
    },[])

      // トークン認証時間切れの処理
      const toNotTokenAuthentication = () => {
        router.toNotTokenAuthentication();
      }

    // グリッド毎に一致したポケモン情報をDBから取得する処理
    // GETの場合はクエリストリングにパラメータ乗せるか"option"でパラメータつける方法で使用
    const getPokemonList = () => {
      // ③axios.get()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
      axios.get(process.env.REACT_APP_API_URL + 'v1/party_grid/', {
        params: {
            // ポケモンの名前とグリッドの番号をパラメータとしてAPIに渡す
            pokemon_name6: (props.currentSelectPokemon6),
            index: props.index,
        },
        // ④header情報にcookieのアクセストークンを載せて通信する
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${cookies.get('accesstoken')}`
        }
      })
      .then(response=>{
            if (props.index === 5) {
                const keyLst = [];
                const valueLst = [];
                for (const [key, value] of Object.entries(response.data.records[0])) {
                  keyLst.push(key);
                  valueLst.push(value);
                }
                setPokemonValueList(valueLst);
            }
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
      <div className='total_container'>
        <div className='key_container'>
          <div>
            <p>ID</p>
            <p>名前</p>
            <p>レベル</p>
            <p>性格</p>
            <p>個性</p>
            <p>持ち物</p>
            <p>HP</p>
            <p>攻撃</p>
            <p>防御</p>
            <p>特攻</p>
            <p>特防</p>
            <p>素早さ</p>
            <p>HP努力値</p>
            <p>攻撃努力値</p>
            <p>防御努力値</p>
            <p>特攻努力値</p>
            <p>特防努力値</p>
            <p>素早さ努力値</p>
            <p>作成日時</p>
            <p>更新日時</p>
          </div>
        </div>
        <div className='value_container'>
          {pokemonValueList.map((row: any) => (
            <p>{row === null ? "-" : row}</p>
          ))}
        </div>
      </div>
  )
}

export default PartyGridPokemon6
