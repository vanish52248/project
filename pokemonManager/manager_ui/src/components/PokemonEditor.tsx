// 登録済みポケモン管理画面のコンポーネント
import React, { useState, useEffect } from 'react'

import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Tooltip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

// ①ユニバーサルクッキーをインポート
import Cookies from 'universal-cookie';

import Header from './Header'
import ComponentTitle from './ComponentTitle'
import { RoutingLogic } from '../logic/router-logic';
import SnackBar from './SnackBar';
import PokemonEditorDeleteDialog from './PokemonEditorDeleteDialog';
import PokemonEditorEditDialog from './PokemonEditorEditDialog';
import '../css/PokemonEditor.css'

const PokemonEditor = () => {
  // スナックバーに表示するメッセージの変数
  const [messageState, setMessage] = useState<any>("");
  // スナックバーの色を判定する変数
  const [severity, setSeverity] = useState<any>("");
  // スナックバーの開閉を判定する変数
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  // ②cookieを取得するインスタンスの作成
  const cookies = new Cookies();
  // 編集用ダイアログの判定フラグ
  const [pokemonEditOpen, setPokemonEditOpen] = useState<boolean>(false);
  // 削除用ダイアログの判定フラグ
  const [pokemonDeleteOpen, setPokemonDeleteOpen] = useState<boolean>(false);
  // 現在選択したポケモンID
  const [currentPokemonId, setCurrentPokemonId] = useState<number>();
  // 現在選択したポケモン名
  const [currentPokemonName, setCurrentPokemonName] = useState<string>("");
  // 現在選択したポケモンのレベル
  const [currentPokemonLevel, setCurrentPokemonLevel] = useState<number>();
  // 現在選択したポケモンの性格
  const [currentPokemonPersonality, setCurrentPokemonPersonality] = useState<string>("");
  // 現在選択したポケモンの個性
  const [currentPokemonIdentity, setCurrentPokemonIdentity] = useState<string>("");
  // 現在選択したポケモン名の持ち物
  const [currentPokemonItem, setCurrentPokemonItem] = useState<string>("");
  // 現在選択したポケモン名のHP
  const [currentPokemonHp, setCurrentPokemonHp] = useState<number>();
  // 現在選択したポケモン名の攻撃
  const [currentPokemonAttack, setCurrentPokemonAttack] = useState<number>();
  // 現在選択したポケモン名の防御
  const [currentPokemonDefence, setCurrentPokemonDefence] = useState<number>();
  // 現在選択したポケモン名の特攻
  const [currentPokemonSpecialAttack, setCurrentPokemonSpecialAttack] = useState<number>();
  // 現在選択したポケモン名の特防
  const [currentPokemonSpecialDefence, setCurrentPokemonSpecialDefence] = useState<number>();
  // 現在選択したポケモン名の素早さ
  const [currentPokemonSpeed, setCurrentPokemonSpeed] = useState<number>();
  // DBから取得した登録済みポケモン情報を格納する配列
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const router = RoutingLogic()

  // 画面遷移時・削除、編集成功時にポケモンリストを読み込む
  useEffect(() => {
    getPokemonList()
  }, [openSnack])

  // トークン認証時間切れの処理
  const toNotTokenAuthentication = () => {
    router.toNotTokenAuthentication();
  }

  // 編集用ダイアログを開く処理
  const PokemonEditorEditDialogOpen = (
    pokemon_id: number,
    pokemon_name: string,
    pokemon_level: number,
    pokemon_personality: string,
    pokemon_identity: string,
    pokemon_item: string,
    pokemon_hp: number,
    pokemon_attack: number,
    pokemon_defence: number,
    pokemon_special_attack: number,
    pokemon_special_defence: number,
    pokemon_speed: number,
  ) => {
    setPokemonEditOpen(true);
    setCurrentPokemonId(pokemon_id);
    setCurrentPokemonName(pokemon_name);
    setCurrentPokemonLevel(pokemon_level);
    setCurrentPokemonPersonality(pokemon_personality);
    setCurrentPokemonIdentity(pokemon_identity);
    setCurrentPokemonItem(pokemon_item);
    setCurrentPokemonHp(pokemon_hp);
    setCurrentPokemonAttack(pokemon_attack);
    setCurrentPokemonDefence(pokemon_defence);
    setCurrentPokemonSpecialAttack(pokemon_special_attack);
    setCurrentPokemonSpecialDefence(pokemon_special_defence);
    setCurrentPokemonSpeed(pokemon_speed);
  }

  // 削除用ダイアログを開く処理
  const PokemonEditorDeleteDialogOpen = (pokemon_name: string, pokemon_id: number) => {
    setPokemonDeleteOpen(true);
    setCurrentPokemonName(pokemon_name);
    setCurrentPokemonId(pokemon_id);
  }

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
      .then(response => {
        // GUIでテーブル表示するための全てのポケモン情報をstateに格納する
        const valueLst = [];
        for (var i = 0; i < response.data.records.length; i++) {
          const tempList = []
          for (const value of Object.values(response.data.records[i])) {
            tempList.push(value);
          }
          valueLst.push(tempList);
        }
        setPokemonList(valueLst);
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

  return (
    <>
      <Header />
      {/* スナックバーの開閉処理 */}
      {openSnack ?
        <SnackBar
          severity={severity}
          setSeverity={setSeverity}
          message={messageState}
          setMessage={setMessage}
          setOpen={setOpenSnack}
        /> : ""}
      {/* 削除ダイアログ判定フラグがtrueの際に削除用ダイアログコンポーネントにpropsを渡して開く */}
      {pokemonDeleteOpen ? <PokemonEditorDeleteDialog
        setPokemonDeleteOpen={setPokemonDeleteOpen}
        // 削除に必要な選択されているポケモンの名前とID
        currentPokemonName={currentPokemonName}
        currentPokemonId={currentPokemonId}
        // スナックバーの設定
        setSeverity={setSeverity}
        setMessage={setMessage}
        setOpenSnack={setOpenSnack}
      /> : ""}
      {/* 編集ダイアログ判定フラグがtrueの際に編集用ダイアログコンポーネントにpropsを渡して開く */}
      {pokemonEditOpen ? <PokemonEditorEditDialog
        setPokemonEditOpen={setPokemonEditOpen}
        // 編集に必要な選択されているポケモンの情報とセッター
        currentPokemonId={currentPokemonId}
        currentPokemonName={currentPokemonName}
        setCurrentPokemonName={setCurrentPokemonName}
        currentPokemonLevel={currentPokemonLevel}
        setCurrentPokemonLevel={setCurrentPokemonLevel}
        currentPokemonPersonality={currentPokemonPersonality}
        setCurrentPokemonPersonality={setCurrentPokemonPersonality}
        currentPokemonIdentity={currentPokemonIdentity}
        setCurrentPokemonIdentity={setCurrentPokemonIdentity}
        currentPokemonItem={currentPokemonItem}
        setCurrentPokemonItem={setCurrentPokemonItem}
        currentPokemonHp={currentPokemonHp}
        setCurrentPokemonHp={setCurrentPokemonHp}
        currentPokemonAttack={currentPokemonAttack}
        setCurrentPokemonAttack={setCurrentPokemonAttack}
        currentPokemonDefence={currentPokemonDefence}
        setCurrentPokemonDefence={setCurrentPokemonDefence}
        currentPokemonSpecialAttack={currentPokemonSpecialAttack}
        setCurrentPokemonSpecialAttack={setCurrentPokemonSpecialAttack}
        currentPokemonSpecialDefence={currentPokemonSpecialDefence}
        setCurrentPokemonSpecialDefence={setCurrentPokemonSpecialDefence}
        currentPokemonSpeed={currentPokemonSpeed}
        setCurrentPokemonSpeed={setCurrentPokemonSpeed}
        // スナックバーの設定
        setSeverity={setSeverity}
        setMessage={setMessage}
        setOpenSnack={setOpenSnack}
      /> : ""}

      <Box>
        <Paper className='pokemon_editor_form_wrapper' elevation={3}>
          <div>
            <ComponentTitle title="ポケモン管理" />
            <TableContainer component={Paper} className='pokemon_editor_tb'>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ポケモン</TableCell>
                    <TableCell align="center">レベル</TableCell>
                    <TableCell align="center">性格</TableCell>
                    <TableCell align="center">個性</TableCell>
                    <TableCell align="center">持ち物</TableCell>
                    <TableCell align="center">HP</TableCell>
                    <TableCell align="center">攻撃</TableCell>
                    <TableCell align="center">防御</TableCell>
                    <TableCell align="center">特攻</TableCell>
                    <TableCell align="center">特防</TableCell>
                    <TableCell align="center">素早さ</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pokemonList.map((element: any, index: number) => (
                    <TableRow className='pokemon_editor_tr'>
                      <TableCell align="center">{element[1] === null ? "-" : element[1]}</TableCell>
                      <TableCell align="center">{element[2] === null ? "-" : element[2]}</TableCell>
                      <TableCell align="center">{element[3] === null ? "-" : element[3]}</TableCell>
                      <TableCell align="center">{element[4] === null ? "-" : element[4]}</TableCell>
                      <TableCell align="center">{element[5] === null ? "-" : element[5]}</TableCell>
                      <TableCell align="center">{element[6] === null ? "-" : element[6]}</TableCell>
                      <TableCell align="center">{element[7] === null ? "-" : element[7]}</TableCell>
                      <TableCell align="center">{element[8] === null ? "-" : element[8]}</TableCell>
                      <TableCell align="center">{element[9] === null ? "-" : element[9]}</TableCell>
                      <TableCell align="center">{element[10] === null ? "-" : element[10]}</TableCell>
                      <TableCell align="center">{element[11] === null ? "-" : element[11]}</TableCell>
                      <TableCell align="center">
                        <Tooltip title={<Typography style={{ fontSize: "15px" }}>登録ポケモン情報を編集</Typography>}>
                          <EditIcon
                            fontSize='large'
                            className='pokemon_editor_edit_icon'
                            onClick={() => PokemonEditorEditDialogOpen(
                              element[0], element[1], element[2], element[3], element[4], element[5], element[6],
                              element[7], element[8], element[9], element[10], element[11],
                            )}
                            key={index}
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title={<Typography style={{ fontSize: "15px" }}>ポケモンを削除</Typography>}>
                          <DeleteOutlineIcon
                            fontSize='large'
                            className='pokemon_editor_delete_icon'
                            onClick={() => PokemonEditorDeleteDialogOpen(element[1], element[0])}
                            key={index}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      </Box>
    </>
  )
}

export default PokemonEditor
