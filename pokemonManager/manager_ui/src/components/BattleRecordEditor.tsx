// 登録済みランクバトル戦績管理画面のコンポーネント
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
import BattleRecordEditorDeleteDialog from './BattleRecordEditorDeleteDialog';
import BattleRecordEditorEditDialog from './BattleRecordEditorEditDialog';
import '../css/BattleRecordEditor.css'

const BattleRecordEditor = () => {
  // スナックバーに表示するメッセージの変数
  const [messageState, setMessage] = useState<any>("");
  // スナックバーの色を判定する変数
  const [severity, setSeverity] = useState<any>("");
  // スナックバーの開閉を判定する変数
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  // 編集用ダイアログの判定フラグ
  const [battleRecordEditOpen, setBattleRecordEditOpen] = useState<boolean>(false);
  // 削除用ダイアログの判定フラグ
  const [battleRecordDeleteOpen, setBattleRecordDeleteOpen] = useState<boolean>(false);
  // 現在選択したバトル戦績のID
  const [currentID, setCurrentID] = useState<number>();
  // 現在選択したバトル戦績のランク
  const [currentRank, setCurrentRank] = useState<string>();
  // 現在選択したバトル戦績のパーティー名
  const [currentPartyName, setCurrentPartyName] = useState<string>();
  // 現在選択したバトル戦績のポケモン名
  const [currentMyPokemon, setCurrentMyPokemon] = useState<string>();
  // 現在選択したバトル戦績の相手ポケモン名
  const [currentEnemyPokemon, setCurrentEnemyPokemon] = useState<string>();
  // 現在選択したバトル戦績の結果
  const [currentResult, setCurrentResult] = useState<string>();
  // DBから取得した登録済みバトル戦績情報を格納する配列
  const [battleRecordList, setBattleRecordList] = useState<any[]>([]);

  // ②cookieを取得するインスタンスの作成
  const cookies = new Cookies();

  const router = RoutingLogic()

  // 画面遷移時・削除、編集成功時にバトル戦績リストを読み込む
  useEffect(() => {
    getBattleRecordList()
  }, [openSnack])

  // トークン認証時間切れの処理
  const toNotTokenAuthentication = () => {
    router.toNotTokenAuthentication();
  }

  // 登録済みバトル戦績一覧をDBから取得する処理
  const getBattleRecordList = () => {
    // ③axios.get()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
    axios.get(process.env.REACT_APP_API_URL + 'v1/battle_record_list/', {
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
        setBattleRecordList(valueLst);
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

  // 編集用ダイアログを開く処理
  const BattleRecordEditorEditDialogOpen = (
    battle_id: number,
    rank: string,
    party_name: string,
    my_pokemon: string,
    enemy_pokemon: string,
    result: string,
  ) => {
    setBattleRecordEditOpen(true);
    setCurrentID(battle_id);
    setCurrentRank(rank);
    setCurrentPartyName(party_name);
    setCurrentMyPokemon(my_pokemon);
    setCurrentEnemyPokemon(enemy_pokemon);
    setCurrentResult(result);
  }

  // 削除用ダイアログを開く処理
  const PokemonEditorDeleteDialogOpen = (rank: string, battle_id: number) => {
    setBattleRecordDeleteOpen(true);
    setCurrentID(battle_id);
    setCurrentRank(rank);
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
      {battleRecordDeleteOpen ? <BattleRecordEditorDeleteDialog
        setBattleRecordDeleteOpen={setBattleRecordDeleteOpen}
        // 削除に必要な選択されている戦績のID
        currentID={currentID}
        currentRank={currentRank}
        // スナックバーの設定
        setSeverity={setSeverity}
        setMessage={setMessage}
        setOpenSnack={setOpenSnack}
      /> : ""}
      {/* 編集ダイアログ判定フラグがtrueの際に編集用ダイアログコンポーネントにpropsを渡して開く */}
      {battleRecordEditOpen ? <BattleRecordEditorEditDialog
        setBattleRecordEditOpen={setBattleRecordEditOpen}
        // 編集に必要な選択されている戦績の情報とセッター
        currentID={currentID}
        setCurrentID={setCurrentID}
        currentRank={currentRank}
        setCurrentRank={setCurrentRank}
        currentPartyName={currentPartyName}
        setCurrentPartyName={setCurrentPartyName}
        currentMyPokemon={currentMyPokemon}
        setCurrentMyPokemon={setCurrentMyPokemon}
        currentEnemyPokemon={currentEnemyPokemon}
        setCurrentEnemyPokemon={setCurrentEnemyPokemon}
        currentResult={currentResult}
        setCurrentResult={setCurrentResult}
        // スナックバーの設定
        setSeverity={setSeverity}
        setMessage={setMessage}
        setOpenSnack={setOpenSnack}
      /> : ""}
      <Box>
        <Paper className='battle_record_editor_form_wrapper' elevation={3}>
          <div>
            <ComponentTitle title="バトル戦績管理" />
            <TableContainer component={Paper} className='battle_record_editor_tb'>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ランク</TableCell>
                    <TableCell align="center">パーティー名</TableCell>
                    <TableCell align="center">自分選出ポケモン</TableCell>
                    <TableCell align="center">相手選出ポケモン</TableCell>
                    <TableCell align="center">結果</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {battleRecordList.map((element: any, index: number) => (
                    <TableRow className='battle_record_editor_tr'>
                      <TableCell align="center">{element[1] === null ? "-" : element[1]}</TableCell>
                      <TableCell align="center">{element[2] === null ? "-" : element[2]}</TableCell>
                      <TableCell align="center">{element[3] == null ? "-" : element[3].toString().replaceAll("None,", "").replaceAll(",None", "")}</TableCell>
                      <TableCell align="center">{element[4] == null ? "-" : element[4].toString().replaceAll("None,", "").replaceAll(",None", "")}</TableCell>
                      <TableCell align="center">{element[5] === null ? "-": element[5]}</TableCell>
                      <TableCell align="center">
                        <Tooltip title={<Typography style={{ fontSize: "15px" }}>登録バトル戦績情報を編集</Typography>}>
                          <EditIcon
                            fontSize='large'
                            className='battle_record_editor_edit_icon'
                            onClick={() => BattleRecordEditorEditDialogOpen(
                              element[0], element[1], element[2], element[3], element[4], element[5]
                            )}
                            key={index}
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title={<Typography style={{ fontSize: "15px" }}>バトル戦績を削除</Typography>}>
                          <DeleteOutlineIcon
                            fontSize='large'
                            className='battle_record_editor_delete_icon'
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

export default BattleRecordEditor
