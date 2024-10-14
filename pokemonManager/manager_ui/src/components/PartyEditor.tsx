// 登録済みパーティー管理画面のコンポーネント
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
import PartyEditorDeleteDialog from './PartyEditorDeleteDialog';
import PartyEditorEditDialog from './PartyEditorEditDialog';
import '../css/PartyEditor.css'

const PartyEditor = () => {
  // スナックバーに表示するメッセージの変数
  const [messageState, setMessage] = useState<any>("");
  // スナックバーの色を判定する変数
  const [severity, setSeverity] = useState<any>("");
  // スナックバーの開閉を判定する変数
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  // ②cookieを取得するインスタンスの作成
  const cookies = new Cookies();
  // 編集用ダイアログの判定フラグ
  const [partyEditOpen, setPartyEditOpen] = useState<boolean>(false);
  // 削除用ダイアログの判定フラグ
  const [partyDeleteOpen, setPartyDeleteOpen] = useState<boolean>(false);
  // 現在選択したポケモンID
  const [currentPartyId, setCurrentPartyId] = useState<number>();
  // 現在選択したポケモン名
  const [currentPartyName, setCurrentPartyName] = useState<string>("");
  // DBから取得した登録済みポケモン情報を格納する配列
  const [partyList, setPartyList] = useState<any[]>([]);
  const router = RoutingLogic()

  // 画面遷移時・削除、編集成功時にパーティーリストを読み込む
  useEffect(() => {
    getPartyList()
  }, [openSnack])

  // トークン認証時間切れの処理
  const toNotTokenAuthentication = () => {
    router.toNotTokenAuthentication();
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
        // GUIでテーブル表示するための全てのパーティー情報をstateに格納する
        const valueLst: any = [];
        const judgeList: any = [];
        for (var i = 0; i < response.data.records.length; i++) {
          const tempList: any = []
          for (const value of Object.values(response.data.records[i])) {
            tempList.push(value);
          }
          // リストからの重複排除
          if (!judgeList.includes(tempList[1])) {
            judgeList.push(tempList[1]);
            valueLst.push(tempList);
          }
        }
        setPartyList(valueLst);
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
  const PartyEditorEditDialogOpen = (party_name: string, party_id: number) => {
    setPartyEditOpen(true);
    setCurrentPartyId(party_id);
    setCurrentPartyName(party_name);
  }

    // 削除用ダイアログを開く処理
    const PartyEditorDeleteDialogOpen = (party_name: string, party_id: number) => {
      setPartyDeleteOpen(true);
      setCurrentPartyId(party_id);
      setCurrentPartyName(party_name);  
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
      {partyDeleteOpen ? <PartyEditorDeleteDialog
        setPartyDeleteOpen={setPartyDeleteOpen}
        // 削除に必要な選択されているパーティーの名前とID
        currentPartyName={currentPartyName}
        currentPartyId={currentPartyId}
        // スナックバーの設定
        setSeverity={setSeverity}
        setMessage={setMessage}
        setOpenSnack={setOpenSnack}
      /> : ""}
      {/* 編集ダイアログ判定フラグがtrueの際に編集用ダイアログコンポーネントにpropsを渡して開く */}
      {partyEditOpen ? <PartyEditorEditDialog
        setPartyEditOpen={setPartyEditOpen}
        // 編集に必要な選択されているパーティーの情報とセッター
        currentPartyName={currentPartyName}
        setCurrentPartyName={setCurrentPartyName}
        currentPartyId={currentPartyId}
        // スナックバーの設定
        setSeverity={setSeverity}
        setMessage={setMessage}
        setOpenSnack={setOpenSnack}
      /> : ""}

      <Box>
        <Paper className='party_editor_form_wrapper' elevation={3}>
          <div>
            <ComponentTitle title="パーティー管理" />
            <TableContainer component={Paper} className='party_editor_tb'>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className='party_editor_th'>パーティー名</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {partyList.map((element: any, index: number) => (
                      <TableRow className='party_editor_tr'>
                        <TableCell align="center" className='party_editor_tc'>
                          {element[1] === null ? "-" : element[1]}
                          </TableCell>
                        <TableCell align="center" className='party_editor_tc2'>
                          <Tooltip title={<Typography style={{ fontSize: "15px" }}>登録済パーティー確認・編集</Typography>}>
                            <EditIcon
                              fontSize='large'
                              className='party_editor_edit_icon'
                              onClick={() => PartyEditorEditDialogOpen(element[1], element[0])}
                              key={index}
                            />
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center" className='party_editor_tc3'>
                          <Tooltip title={<Typography style={{ fontSize: "15px" }}>パーティーを削除</Typography>}>
                            <DeleteOutlineIcon
                              fontSize='large'
                              className='party_editor_delete_icon'
                              onClick={() => PartyEditorDeleteDialogOpen(element[1], element[0])}
                              key={index}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}

                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      </Box>
    </>
  )
}

export default PartyEditor
