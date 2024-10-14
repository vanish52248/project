// バトル戦績画面のフォームのコンポーネント
import React, { useState, useEffect } from 'react'

import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// ①ユニバーサルクッキーをインポート
import Cookies from 'universal-cookie';

import ComponentTitle from './ComponentTitle'
import { RoutingLogic } from '../logic/router-logic';
import SnackBar from './SnackBar';
import '../css/BattleRecordForm.css'


export default function BattleRecordForm() {
  // スナックバーに表示するメッセージの変数
  const [messageState, setMessage] = useState<any>("");
  // スナックバーの色を判定する変数
  const [severity, setSeverity] = useState<any>("");
  // スナックバーの開閉を判定する変数
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  // ランクを格納する変数
  const [rank, setRank] = useState<any>();
  // パーティー名を格納する変数
  const [partyName, setPartyName] = useState<any>();
  // 対戦結果を格納する変数
  const [result, setResult] = useState<any>();
  // 相手の1匹目のポケモン名を格納する変数
  const [enemyPokemon1, setEnemyPokemon1] = useState<any>();
  // 相手の2匹目のポケモン名を格納する変数
  const [enemyPokemon2, setEnemyPokemon2] = useState<any>();
  // 相手の3匹目のポケモン名を格納する変数
  const [enemyPokemon3, setEnemyPokemon3] = useState<any>();
  // ポケモンの名前6匹分を格納する配列
  const currentPokemonList: any[] = [];
  const [pokemonList, setPokemonList] = useState<any>([]);
  // 選択パーティーの内チェックしたポケモンを格納するオブジェクト
  const [checkedPokemons, setCheckedPokemons] = useState<any>({})
  // 対戦総数を格納する変数
  let battleCount = 0;
  // 勝利数を取得して格納する変数
  const [winCount, setWinCount] = useState(0);
  // 敗北数を取得して格納する変数
  const [loseCount, setLoseCount] = useState(0);
  // 引分数を取得して格納する変数
  const [drawCount, setDrawCount] = useState(0);
  // 勝率を計算して格納する変数
  const [winRate, setWinRate] = useState(0.0);
  // DBから取得した登録済みパーティー名を格納する配列
  const [partyList, setPartyList] = React.useState<any[]>([]);
  // ②cookieを取得するインスタンスの作成
  const cookies = new Cookies();
  // リセットボタンを取得する変数
  const resetBtn: any = document.getElementById('clear_field_btn');

  const router = RoutingLogic()

  // トークン認証時間切れの処理
  const toNotTokenAuthentication = () => {
    router.toNotTokenAuthentication();
  }

  // 初回起動時に非同期で読み込む処理
  useEffect(() => {
    (async () => {
      getPartyList();
      getBattleResultCount();
    })();
  }, []);

  // 各 対戦結果を表示するための処理
  const getBattleResultCount = () => {
    // ③axios.get()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
    axios.get(process.env.REACT_APP_API_URL + 'v1/battle_result_count/', {
      // ④header情報にcookieのアクセストークンを載せて通信する
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    })
      .then(response => {
        // 対戦結果の総数を計算
        battleCount = (response.data.records.win === undefined ? 0 : response.data.records.win)
          + (response.data.records.lose === undefined ? 0 : response.data.records.lose)
          + (response.data.records.draw === undefined ? 0 : response.data.records.draw);
        (response.data.records.win) === undefined ? setWinCount(0) : setWinCount(response.data.records.win);
        (response.data.records.lose) === undefined ? setLoseCount(0) : setLoseCount(response.data.records.lose);
        (response.data.records.draw) === undefined ? setDrawCount(0) : setDrawCount(response.data.records.draw);
        // 計算((対戦総数(引き分け含む) / 勝利数)*100)して勝率を設定(小数点以下切り捨て)
        // 計算結果がNaNの時は0%と表記させる
        const culc = Number.isNaN(Math.floor((response.data.records.win / battleCount) * 100)) ?
          0 : Math.floor((response.data.records.win / battleCount) * 100);
        setWinRate(culc);
      })
      .catch(error => {
        // Token認証時間切れ時の処理→ログイン画面へ遷移
        if (error.response.status === 401) {
          toNotTokenAuthentication();
        } else {
          window.console.error(`axios-FAILED:${error}`);
        }
      })
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
      .then(response => {
        // 重複がない値のみを格納する配列
        const uniqueList: any[] = [];
        response.data.records.forEach((element: any) => {
          // ループごとの現在のパーティー名を設定する変数
          const currentValue = element.party_name;
          // 重複がない値ならループ前の配列を分解して新たにループ後のパーティー名を一つずつ格納する
          if (!uniqueList.includes(currentValue)) {
            uniqueList.push(currentValue);
            setPartyList((prevState) => ([...prevState, element.party_name]));
          }
        })
      })
      .catch(error => {
        // Token認証時間切れ時の処理→ログイン画面へ遷移
        if (error.response.status === 401) {
          toNotTokenAuthentication();
        } else {
          window.console.error(`axios-FAILED:${error}`);
        }
      })
  }

  // プルダウンで変更したランクを保持する処理
  const rankChange = (event: any) => {
    setRank(() => event.target.value);
  };

  // プルダウンを切り替えた時のパーティー取得処理
  const handleChange = (event: any) => {
    // パーティー名の格納
    setPartyName(event.target.value);
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
      .then(response => {
        response.data.records.forEach((element: any, index: number) => {
          // パーティー名で検索してAPIから6匹のポケモンを取得して1つの配列で管理
          if (index === 0) {
            currentPokemonList.push(element.poke_name_id)
          } else if (index === 1) {
            currentPokemonList.push(element.poke_name_id)
          } else if (index === 2) {
            currentPokemonList.push(element.poke_name_id)
          } else if (index === 3) {
            currentPokemonList.push(element.poke_name_id)
          } else if (index === 4) {
            currentPokemonList.push(element.poke_name_id)
          } else if (index === 5) {
            currentPokemonList.push(element.poke_name_id)
          }
        })
        // 6匹分を1つの配列Stateで管理
        setPokemonList(currentPokemonList)
      })
      .catch(error => {
        // Token認証時間切れ時の処理→ログイン画面へ遷移
        if (error.response.status === 401) {
          toNotTokenAuthentication();
        } else {
          window.console.error(`axios-FAILED:${error}`);
        }
      })
  };

  // テキストエリアで変更した1匹目の相手ポケモンを保持する処理
  const enemyPokemonChange1 = (event: any) => {
    setEnemyPokemon1(() => event.target.value);
  }
  // テキストエリアで変更した2匹目の相手ポケモンを保持する処理
  const enemyPokemonChange2 = (event: any) => {
    setEnemyPokemon2(() => event.target.value);
  }

  // テキストエリアで変更した3匹目の相手ポケモンを保持する処理
  const enemyPokemonChange3 = (event: any) => {
    setEnemyPokemon3(() => event.target.value);
  }

  // チェックボックスをチェック/非チェックした際の処理
  const pokemonJudge = (e: any) => {
    //checkedPokemonsのstateをセット
    setCheckedPokemons({
      ...checkedPokemons,
      [e.target.value]: e.target.checked
    })
  }

  // プルダウンで変更した対戦結果を保持する処理
  const resultChange = (event: any) => {
    setResult(() => event.target.value);
  };

  // APIへ渡すデータの定義
  const data = {
    rank: rank,
    party_name: partyName,
    my_pokemon: checkedPokemons,
    enemy_pokemon:
      [
        // 敵の3体のポケモンは テキストエリア削除後の "" もNoneとしてBEに渡す
        enemyPokemon1 === "" ? null : enemyPokemon1,
        enemyPokemon2 === "" ? null : enemyPokemon2,
        enemyPokemon3 === "" ? null : enemyPokemon3,
      ],
    result: result,
  }

  // 登録ボタンをクリックした際の処理
  const pokemonClickRegister = () => {
    // ③axios.post()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
    axios.post(process.env.REACT_APP_API_URL + 'v1/battle_record_register/', data, {
      // ④header情報にcookieのアクセストークンを載せて通信する
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    })
      .then(response => {
        setOpenSnack(true);
        setSeverity("success");
        setMessage("戦績の登録が完了しました。");
        getBattleResultCount();
        // リセットボタンをクリックさせる処理をスナックバー出現の1秒後に開始
        setTimeout(() => {
          resetBtn.click();
        }, 1000);
      })
      .catch(error => {
        // Token認証時間切れ時の処理→ログイン画面へ遷移
        if (error.response.status === 401) {
          toNotTokenAuthentication();
        } else {
          // error.response.dataの中にAPIからraiseしてきたJSONの値が格納されている
          setOpenSnack(true);
          window.console.error(`axios-FAILED:${JSON.stringify(error.response.data.error_message)}`);
          setMessage(error.response.data.error_message);
          setSeverity("error");
        }
      })
  }

  // リセットボタンが押された際の入力フォームを全て初期化する処理
  const resetForm = () => {
    const name: any = document.getElementById('input_all_form_container');
    // 組み込み関数のreset()を使用する
    name.reset();
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
      {/* 入力フォームをリセットするための大枠を<form>で囲む */}
      <form id="input_all_form_container">
        <Box>
          <Paper className='battle_record_form_wrapper' elevation={3}>
            <ComponentTitle title="バトル戦績" />
            <div>
              <div className='rank_container'>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel id="demo-simple-select-autowidth-label3">対戦時のランク</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label3"
                    id="demo-simple-select-autowidth"
                    onChange={rankChange}
                    label="ランク"
                  >
                    <MenuItem value="">
                      <em>未選択</em>
                    </MenuItem>
                    <MenuItem value={rank === "未選択" ? "" : "beginner"}>ビギナー級</MenuItem>
                    <MenuItem value={rank === "未選択" ? "" : "monsterBall"}>モンスターボール級</MenuItem>
                    <MenuItem value={rank === "未選択" ? "" : "superBall"}>スーパーボール級</MenuItem>
                    <MenuItem value={rank === "未選択" ? "" : "hyperBall"}>ハイパーボール級</MenuItem>
                    <MenuItem value={rank === "未選択" ? "" : "masterBall"}>マスターボール級</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='party_container'>
                <FormControl sx={{ m: 1, minWidth: 500 }}>
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
                        onChange={(e) => handleChange(e)}
                      >
                        {element}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='party_select_container'>
                <Box
                  sx={{
                    width: 900,
                    height: 300,
                    backgroundColor: '#fff',
                  }}
                  className='party_box'
                >
                  <Typography variant="body1" fontSize={"25px"} className='win_rate_text' >
                    自分側 選出パーティー
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 0, sm: 4, md: 12 }}>
                      {pokemonList.map((value: any, index: number) => (
                        <Grid item xs={1} sm={1} md={6} key={index}>
                          <div className='grid_container'>
                            <FormGroup>
                              <FormControlLabel control={
                                <Checkbox
                                  id={`id_${index}`}
                                  key={index}
                                  value={value}
                                  onChange={pokemonJudge}
                                  checked={checkedPokemons[value.id]}
                                />
                                // labelで表示するテキスト(そのテキスト範囲内でもチェック可能にする)
                              } label={value} />
                            </FormGroup>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 410,
                    height: 300,
                    backgroundColor: '#fff',
                  }}
                  className='party_box'
                >
                  <Typography variant="body1" fontSize={"25px"} className='win_rate_text' >
                    相手側 選出パーティー
                  </Typography>
                  <div className='enemy_pokemon_wrapper'>
                    <div className='enemy_pokemon_box'>
                      <TextField
                        className='enemy_pokemon_item'
                        id="outlined-basic"
                        label="1匹目のポケモン"
                        variant="outlined"
                        value={enemyPokemon1}
                        onChange={enemyPokemonChange1}
                      />
                    </div>
                    <div className='enemy_pokemon_box'>
                      <TextField
                        className='enemy_pokemon_item'
                        id="outlined-basic"
                        label="2匹目のポケモン"
                        variant="outlined"
                        value={enemyPokemon2}
                        onChange={enemyPokemonChange2}
                      />
                    </div>
                    <div className='enemy_pokemon_box'>
                      <TextField
                        className='enemy_pokemon_item'
                        id="outlined-basic"
                        label="3匹目のポケモン"
                        variant="outlined"
                        value={enemyPokemon3}
                        onChange={enemyPokemonChange3}
                      />
                    </div>
                  </div>
                </Box>
              </div>
              <div className='result_container'>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel id="demo-simple-select-autowidth-label3">対戦結果</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label3"
                    id="demo-simple-select-autowidth"
                    onChange={resultChange}
                    label="対戦結果"
                  >
                    <MenuItem value="">
                      <em>未選択</em>
                    </MenuItem>
                    <MenuItem value={result === "未選択" ? "" : "win"}>勝ち</MenuItem>
                    <MenuItem value={result === "未選択" ? "" : "lose"}>負け</MenuItem>
                    <MenuItem value={result === "未選択" ? "" : "draw"}>引き分け</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='win_rate_container'>
                <Box
                  sx={{
                    width: 800,
                    height: 50,
                    backgroundColor: '#fff',
                  }}
                  className='win_rate_box'
                >
                  {/* 対戦結果をDBから取得し、結果送信毎にStateリロードでレンダリング */}
                  <Typography variant="body1" fontSize={"25px"} className='win_rate_text' >
                    勝利数:{winCount}&nbsp;&nbsp;&nbsp;&nbsp;
                    敗北数：{loseCount}&nbsp;&nbsp;&nbsp;&nbsp;
                    引き分け数：{drawCount}&nbsp;&nbsp;&nbsp;&nbsp;
                    勝率：{`${winRate} %`}&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                </Box>
              </div>
              <div className='form_btn_container'>
                <Button
                  className='register_btn'
                  variant="contained"
                  onClick={pokemonClickRegister}
                >登録
                </Button>
              </div>
            </div>
          </Paper>
        </Box>
        {/* <form>内の入力全項目をリセットするボタン */}
        {/* 常時非表示として送信後にクリックされるようjs側で処理 */}
        <button id="clear_field_btn" style={{ display: "none" }} onClick={resetForm} />
      </form>
    </>
  );
}
