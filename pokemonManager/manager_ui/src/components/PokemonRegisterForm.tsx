// ポケモン登録画面のフォームのコンポーネント
import React, { useState } from 'react'

import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
// ①ユニバーサルクッキーをインポート
import Cookies from 'universal-cookie';

import ComponentTitle from './ComponentTitle'
import { RoutingLogic } from '../logic/router-logic';
// 定数ファイルからのアイテム・性格・個性のインポート
import { identityList, itemList, personalityList } from '../const_';
import SnackBar from './SnackBar';
import '../css/PokemonRegisterForm.css'


export default function PokemonRegisterForm() {
  // スナックバーに表示するメッセージの変数
  const [messageState, setMessage] = useState<any>("");
  // スナックバーの色を判定する変数
  const [severity, setSeverity] = useState<any>("");
  // スナックバーの開閉を判定する変数
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  // ポケモン名を格納する変数
  const [pokemonName, setPokemonName] = useState<any>();
  // LVを格納する変数
  const [level, setLevel] = useState<any>();
  // 性格を格納する変数
  const [personality, setPersonality] = useState<any>();
  // 個性を格納する変数
  const [identity, setIdentity] = useState<any>();
  // 持ち物を格納する変数
  const [item, setItem] = useState<any>();
  // HPを格納する変数
  const [hp, setHp] = useState<any>();
  // 攻撃を格納する変数
  const [attack, setAttack] = useState<any>();
  // 防御を格納する変数
  const [defence, setDefence] = useState<any>();
  // 特殊攻撃を格納する変数
  const [specialAttack, setSpecialAttack] = useState<any>();
  // 特殊防御を格納する変数
  const [specialDefence, setSpecialDefence] = useState<any>();
  // 素早さを格納する変数
  const [speed, setSpeed] = useState<any>();
  // HP努力値を格納する変数
  const [hpEffort, setHpEffort] = useState<any>();
  // 攻撃努力値を格納する変数
  const [attackEffort, setAttackEffort] = useState<any>();
  // 防御努力値を格納する変数
  const [defenceEffort, setDefenceEffort] = useState<any>();
  // 特殊攻撃努力値を格納する変数
  const [specialAttackEffort, setSpecialAttackEffort] = useState<any>();
  // 特殊防御努力値を格納する変数
  const [specialDefenceEffort, setSpecialDefenceEffort] = useState<any>();
  // 素早さ努力値を格納する変数
  const [speedEffort, setSpeedEffort] = useState<any>();
  // ②cookieを取得するインスタンスの作成
  const cookies = new Cookies();
  // リセットボタンを取得する変数
  const resetBtn: any = document.getElementById('clear_field_btn');

  // APIへ渡すデータの定義
  const data = {
    pokemonName: pokemonName,
    level: level,
    personality: personality,
    identity: identity,
    item: item,
    hp: hp,
    attack: attack,
    defence: defence,
    specialAttack: specialAttack,
    specialDefence: specialDefence,
    speed: speed,
    hpEffort: hpEffort,
    attackEffort: attackEffort,
    defenceEffort: defenceEffort,
    specialAttackEffort: specialAttackEffort,
    specialDefenceEffort: specialDefenceEffort,
    speedEffort: speedEffort,
  }

  const router = RoutingLogic()

  // トークン認証時間切れの処理
  const toNotTokenAuthentication = () => {
    router.toNotTokenAuthentication();
  }


  // 登録ボタンクリック時にAPIへ入力データを渡す処理
  const pokemonClickRegister = () => {
    // ③axios.post()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
    axios.post(process.env.REACT_APP_API_URL + 'v1/pokemon_register/', data, {
      // ④header情報にcookieのアクセストークンを載せて通信する
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    })
      .then(response => {
        setOpenSnack(true);
        setMessage("ポケモンの登録が完了しました。");
        setSeverity("success");
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

  // テキストエリアで変更したポケモン名を保持する処理
  const pokemonChange = (event: any) => {
    setPokemonName(() => event.target.value);
  };

  // プルダウンで変更したLVを保持する処理
  const levelChange = (event: any) => {
    setLevel(() => event.target.value);
  };

  // プルダウンで変更した性格を保持する処理
  const personalityChange = (event: any) => {
    setPersonality(() => event.target.value);
  };

  // プルダウンで変更した個性を保持する処理
  const identityChange = (event: any) => {
    setIdentity(() => event.target.value);
  };

  // プルダウンで変更した持ち物を保持する処理
  const itemChange = (event: any) => {
    setItem(() => event.target.value);
  };

  // テキストエリアで変更したHPを保持する処理
  const hpChange = (event: any) => {
    setHp(() => event.target.value);
  };

  // テキストエリアで変更した攻撃を保持する処理
  const attackChange = (event: any) => {
    setAttack(() => event.target.value);
  };

  // テキストエリアで変更した防御を保持する処理
  const defenceChange = (event: any) => {
    setDefence(() => event.target.value);
  };

  // テキストエリアで変更した特殊攻撃を保持する処理
  const specialAttackChange = (event: any) => {
    setSpecialAttack(() => event.target.value);
  };

  // テキストエリアで変更した特殊防御を保持する処理
  const specialDefenceChange = (event: any) => {
    setSpecialDefence(() => event.target.value);
  };

  // テキストエリアで変更した素早さを保持する処理
  const speedChange = (event: any) => {
    setSpeed(() => event.target.value);
  };

  // テキストエリアで変更したHP努力値を保持する処理
  const hpEffortChange = (event: any) => {
    setHpEffort(() => event.target.value);
  };

  // テキストエリアで変更した攻撃努力値を保持する処理
  const attackEffortChange = (event: any) => {
    setAttackEffort(() => event.target.value);
  };

  // テキストエリアで変更した防御努力値を保持する処理
  const defenceEffortChange = (event: any) => {
    setDefenceEffort(() => event.target.value);
  };

  // テキストエリアで変更した特殊攻撃努力値を保持する処理
  const specialAttackEffortChange = (event: any) => {
    setSpecialAttackEffort(() => event.target.value);
  };

  // テキストエリアで変更した特殊防御努力値を保持する処理
  const specialDefenceEffortChange = (event: any) => {
    setSpecialDefenceEffort(() => event.target.value);
  };

  // テキストエリアで変更した素早さ努力値を保持する処理
  const speedEffortChange = (event: any) => {
    setSpeedEffort(() => event.target.value);
  };

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
          <Paper className='form_wrapper' elevation={3}>
            <div>
              <div>
                <div>
                  <div className='name_container'>
                    <ComponentTitle title="ポケモン登録" />
                    <TextField
                      className='pokemon_name field_clear_classes'
                      id="outlined-basic"
                      label="ポケモン"
                      variant="outlined"
                      // ポケモン名テキストエリアの値
                      onChange={pokemonChange}
                      value={pokemonName}
                    />
                  </div>
                  <div className='personality_container field_clear_classes'>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-autowidth-label3">レベル</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label3"
                        id="demo-simple-select-autowidth"
                        onChange={levelChange}
                        label="レベル"
                      >
                        <MenuItem value="">
                          <em>未選択</em>
                        </MenuItem>
                        <MenuItem value={level === "未選択" ? "" : 1}>LV: 1</MenuItem>
                        <MenuItem value={level === "未選択" ? "" : 50}>LV: 50</MenuItem>
                        <MenuItem value={level === "未選択" ? "" : 100}>LV: 100</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">性格</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        onChange={personalityChange}
                        label="性格"
                      >
                        <MenuItem value="">
                          <em>未選択</em>
                        </MenuItem>
                        {/* 定数定義ファイルから取得した性格一覧をプルダウンに表示する */}
                        {personalityList.sort().map((element: string, index: number) => (
                          <MenuItem
                            value={personality === "未選択" ? "" : element}
                            key={index}>
                            {element}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-autowidth-label2">個性</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label2"
                        id="demo-simple-select-autowidth"
                        onChange={identityChange}
                        label="個性"
                      >
                        <MenuItem value="">
                          <em>未選択</em>
                        </MenuItem>
                        {/* 定数定義ファイルから取得した個性一覧をプルダウンに表示する */}
                        {identityList.sort().map((element: string, index: number) => (
                          <MenuItem
                            value={identity === "未選択" ? "" : element}
                            key={index}>
                            {element}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-autowidth-label3">持ち物</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-3"
                          id="demo-simple-select-autowidth"
                          onChange={itemChange}
                          label="持ち物"
                        >
                          <MenuItem value="">
                            <em>未選択</em>
                          </MenuItem>
                          {/* 定数定義ファイルから取得した持ち物一覧をプルダウンに表示する */}
                          {itemList.sort().map((element: string, index: number) => (
                            <MenuItem
                              value={item === "未選択" ? "" : element}
                              key={index}>
                              {element}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className='param_container'>
                    <div className='status_container'>
                      <TextField
                        className='status_box'
                        id="outlined-basic"
                        label="HP"
                        variant="outlined"
                        // HPテキストエリアの値
                        value={hp}
                        onChange={hpChange}
                      />
                      <TextField
                        className='status_box'
                        id="outlined-basic"
                        label="攻撃"
                        variant="outlined"
                        // 攻撃テキストエリアの値
                        value={attack}
                        onChange={attackChange}
                      />
                      <TextField
                        className='status_box'
                        id="outlined-basic"
                        label="防御"
                        variant="outlined"
                        // 防御テキストエリアの値
                        value={defence}
                        onChange={defenceChange}
                      />
                      <TextField
                        className='status_box'
                        id="outlined-basic"
                        label="特攻"
                        variant="outlined"
                        // 特殊攻撃テキストエリアの値
                        value={specialAttack}
                        onChange={specialAttackChange}
                      />
                      <TextField
                        className='status_box'
                        id="outlined-basic"
                        label="特防"
                        variant="outlined"
                        // 特殊防御テキストエリアの値
                        value={specialDefence}
                        onChange={specialDefenceChange}
                      />
                      <TextField
                        className='status_box'
                        id="outlined-basic"
                        label="素早さ"
                        variant="outlined"
                        // 素早さテキストエリアの値
                        value={speed}
                        onChange={speedChange}
                      />
                    </div>
                    <div className='effort_container'>
                      <TextField
                        className='effort_box'
                        id="outlined-basic"
                        label="努力値"
                        variant="outlined"
                        // HP努力値テキストエリアの値
                        value={hpEffort}
                        onChange={hpEffortChange}
                      />
                      <TextField
                        className='effort_box'
                        id="outlined-basic"
                        label="努力値"
                        variant="outlined"
                        // 攻撃努力値テキストエリアの値
                        value={attackEffort}
                        onChange={attackEffortChange}
                      />
                      <TextField
                        className='effort_box'
                        id="outlined-basic"
                        label="努力値"
                        variant="outlined"
                        // 防御努力値テキストエリアの値
                        value={defenceEffort}
                        onChange={defenceEffortChange}
                      />
                      <TextField
                        className='effort_box'
                        id="outlined-basic"
                        label="努力値"
                        variant="outlined"
                        // 特殊攻撃努力値テキストエリアの値
                        value={specialAttackEffort}
                        onChange={specialAttackEffortChange}
                      />
                      <TextField
                        className='effort_box'
                        id="outlined-basic"
                        label="努力値"
                        variant="outlined"
                        // 特殊防御努力値テキストエリアの値
                        value={specialDefenceEffort}
                        onChange={specialDefenceEffortChange}
                      />
                      <TextField
                        className='effort_box'
                        id="outlined-basic"
                        label="努力値"
                        variant="outlined"
                        // 素早さ努力値テキストエリアの値
                        value={speedEffort}
                        onChange={speedEffortChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='form_btn_container'>
              <Button
                className='register_btn'
                variant="contained"
                onClick={pokemonClickRegister}
              //  1文字でもポケモン名が入力されればボタンを活性化
              // serializerでガードしているので対応不要
              //  disabled={pokemonName !== "" ? false : true}
              >登録
              </Button>
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
