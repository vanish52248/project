// パーティーグリッドパネルのコンポーネント
import React, { useState } from 'react'

import axios from 'axios';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// ①ユニバーサルクッキーをインポート
import Cookies from 'universal-cookie';

import ComponentTitle from './ComponentTitle'
import { RoutingLogic } from '../logic/router-logic';
import PartySelect from './PartySelect';
import PokemonAddDialog from './PokemonAddDialog';
import PokemonDeleteDialog from './PokemonDeleteDialog';
import PartyGridPokemon1 from './grid/PartyGridPokemon1';
import PartyGridPokemon2 from './grid/PartyGridPokemon2';
import PartyGridPokemon3 from './grid/PartyGridPokemon3';
import PartyGridPokemon4 from './grid/PartyGridPokemon4';
import PartyGridPokemon5 from './grid/PartyGridPokemon5';
import PartyGridPokemon6 from './grid/PartyGridPokemon6';
import SnackBar from './SnackBar';
import '../css/PartyGrid.css';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function PartyGrid() {

  // スナックバーに表示するメッセージの変数
  const [messageState, setMessage] = useState<any>("");
  // スナックバーの色を判定する変数
  const [severity, setSeverity] = useState<any>("");
  // スナックバーの開閉を判定する変数
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  // 登録用ダイアログの判定フラグ
  const [open, setOpen] = React.useState<boolean>(false);
  // 削除用ダイアログの判定フラグ
  const [open2, setOpen2] = React.useState<boolean>(false);
  // グリッドごとに表示するダイアログ内で選択したポケモンの名前の値(*6)
  const [currentSelectPokemon1, setCurrentSelectPokemon1] = React.useState<any>();
  const [currentSelectPokemon2, setCurrentSelectPokemon2] = React.useState<any>();
  const [currentSelectPokemon3, setCurrentSelectPokemon3] = React.useState<any>();
  const [currentSelectPokemon4, setCurrentSelectPokemon4] = React.useState<any>();
  const [currentSelectPokemon5, setCurrentSelectPokemon5] = React.useState<any>();
  const [currentSelectPokemon6, setCurrentSelectPokemon6] = React.useState<any>();
  // 現在クリックしたパーティグリッドのNo.
  const [gridNo, setGridNo] = React.useState<Number>();
  // パーティー名を格納する変数
  const [partyName, setPartyName] = React.useState<any>();
  // ②cookieを取得するインスタンスの作成
  const cookies = new Cookies();

  const router = RoutingLogic()

  // トークン認証時間切れの処理
  const toNotTokenAuthentication = () => {
    router.toNotTokenAuthentication();
  }

  // 登録用ダイアログを開く処理
  const AddDialogOpen = (index: number) => {
    setGridNo(index);
    setOpen(true);
  }

  // 削除用ダイアログを開く処理
  const DeleteDialogOpen = (index: number) => {
    setGridNo(index);
    setOpen2(true);
  }

  // テキストエリアで変更したパーティー名を保持する処理
  const partyNameChange = (event: any) => {
    setPartyName(() => event.target.value);
  }

  // グリッド内の値とパーティー名を初期化する処理
  const initialGrid = () => {
    setCurrentSelectPokemon1(null);
    setCurrentSelectPokemon2(null);
    setCurrentSelectPokemon3(null);
    setCurrentSelectPokemon4(null);
    setCurrentSelectPokemon5(null);
    setCurrentSelectPokemon6(null);
    setPartyName("");
  }

  // APIへ渡すデータの定義
  const data = {
    partyName: partyName,
    currentSelectPokemon1: currentSelectPokemon1,
    currentSelectPokemon2: currentSelectPokemon2,
    currentSelectPokemon3: currentSelectPokemon3,
    currentSelectPokemon4: currentSelectPokemon4,
    currentSelectPokemon5: currentSelectPokemon5,
    currentSelectPokemon6: currentSelectPokemon6,
  }

  // 登録ボタンクリック時の処理
  const partyRegister = () => {
    // ③axios.post()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
    axios.post(process.env.REACT_APP_API_URL + 'v1/party_register/', data, {
      // ④header情報にcookieのアクセストークンを載せて通信する
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    })
      .then(response => {
        setOpenSnack(true);
        setSeverity("success");
        setMessage("パーティーの登録が完了しました。");
        // パーティー登録後にグリッドを全て初期化する
        initialGrid();
      })
      .catch(error => {
        // Token認証時間切れ時の処理→ログイン画面へ遷移
        if (error.response.status === 401) {
          toNotTokenAuthentication();
        } else {
          setOpenSnack(true);
          // error.response.dataの中にAPIからraiseしてきたJSONの値が格納されている
          window.console.error(`axios-FAILED:${JSON.stringify(error.response.data.error_message)}`);
          setSeverity("error");
          setMessage(error.response.data.error_message);
        }
      })
  }

  return (
    <div style={{ margin: "0 8px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Paper className='grid_form_wrapper' elevation={3}>
          <ComponentTitle title="パーティー登録" />
          {/* スナックバーの開閉処理 */}
          {openSnack ?
            <SnackBar
              severity={severity}
              setSeverity={setSeverity}
              message={messageState}
              setMessage={setMessage}
              setOpen={setOpenSnack}
            /> : ""}
          {/* ダイアログ判定フラグがtrueの際に登録用ダイアログコンポーネントにpropsを渡して開く */}
          {open ? <PokemonAddDialog
            setOpen={setOpen}
            setCurrentSelectPokemon1={setCurrentSelectPokemon1}
            setCurrentSelectPokemon2={setCurrentSelectPokemon2}
            setCurrentSelectPokemon3={setCurrentSelectPokemon3}
            setCurrentSelectPokemon4={setCurrentSelectPokemon4}
            setCurrentSelectPokemon5={setCurrentSelectPokemon5}
            setCurrentSelectPokemon6={setCurrentSelectPokemon6}
            // どのグリッドが選択されたかのインデックス
            gridNo={gridNo}
          /> : ""}
          {/* ダイアログ判定フラグがtrueの際に削除用ダイアログコンポーネントにpropsを渡して開く */}
          {open2 ? <PokemonDeleteDialog
            setOpen={setOpen2}
            setCurrentSelectPokemon1={setCurrentSelectPokemon1}
            setCurrentSelectPokemon2={setCurrentSelectPokemon2}
            setCurrentSelectPokemon3={setCurrentSelectPokemon3}
            setCurrentSelectPokemon4={setCurrentSelectPokemon4}
            setCurrentSelectPokemon5={setCurrentSelectPokemon5}
            setCurrentSelectPokemon6={setCurrentSelectPokemon6}
            // 現在選択しているポケモン名
            currentPokemon1={currentSelectPokemon1}
            currentPokemon2={currentSelectPokemon2}
            currentPokemon3={currentSelectPokemon3}
            currentPokemon4={currentSelectPokemon4}
            currentPokemon5={currentSelectPokemon5}
            currentPokemon6={currentSelectPokemon6}
            // どのグリッドが選択されたかのインデックス
            gridNo={gridNo}
          /> : ""}
          <PartySelect
            setCurrentSelectPokemon1={setCurrentSelectPokemon1}
            setCurrentSelectPokemon2={setCurrentSelectPokemon2}
            setCurrentSelectPokemon3={setCurrentSelectPokemon3}
            setCurrentSelectPokemon4={setCurrentSelectPokemon4}
            setCurrentSelectPokemon5={setCurrentSelectPokemon5}
            setCurrentSelectPokemon6={setCurrentSelectPokemon6}
          />
          <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 2, sm: 3, md: 12 }}>
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={3} sm={3} md={4} key={index}>
                {/* DBからのポケモンを表示する */}
                <Item sx={{ height: 220 }} className='party_grid_item'>
                  {/* グリッドごとに選択したポケモンを表示する */}
                  {currentSelectPokemon1 && index === 0 ? <PartyGridPokemon1 index={index} currentSelectPokemon1={currentSelectPokemon1} /> : ""}
                  {currentSelectPokemon2 && index === 1 ? <PartyGridPokemon2 index={index} currentSelectPokemon2={currentSelectPokemon2} /> : ""}
                  {currentSelectPokemon3 && index === 2 ? <PartyGridPokemon3 index={index} currentSelectPokemon3={currentSelectPokemon3} /> : ""}
                  {currentSelectPokemon4 && index === 3 ? <PartyGridPokemon4 index={index} currentSelectPokemon4={currentSelectPokemon4} /> : ""}
                  {currentSelectPokemon5 && index === 4 ? <PartyGridPokemon5 index={index} currentSelectPokemon5={currentSelectPokemon5} /> : ""}
                  {currentSelectPokemon6 && index === 5 ? <PartyGridPokemon6 index={index} currentSelectPokemon6={currentSelectPokemon6} /> : ""}
                  {/* 追加・編集アイコン関連 */}
                    <Tooltip title={<Typography style={{ fontSize: "15px" }}>ポケモンを追加・変更</Typography>}>
                    <AddIcon
                      fontSize='large'
                      className='add_icon'
                      onClick={() => AddDialogOpen(index)}
                      key={index}
                    />
                  </Tooltip>
                  {/* 削除アイコン関連 */}
                  {
                    currentSelectPokemon1 && index === 0 &&
                    <Tooltip title={<Typography style={{ fontSize: "15px" }}>ポケモンを削除</Typography>}>
                      <DeleteOutlineIcon
                        fontSize='large'
                        className='delete_icon'
                        onClick={() => DeleteDialogOpen(index)}
                        key={index}
                        />
                    </Tooltip>
                  }
                  {
                    currentSelectPokemon2 && index === 1 &&
                    <Tooltip title={<Typography style={{ fontSize: "15px" }}>ポケモンを削除</Typography>}>
                      <DeleteOutlineIcon
                        fontSize='large'
                        className='delete_icon'
                        onClick={() => DeleteDialogOpen(index)}
                        key={index}
                        />
                    </Tooltip>
                  }
                  {
                    currentSelectPokemon3 && index === 2 &&
                    <Tooltip title={<Typography style={{ fontSize: "15px" }}>ポケモンを削除</Typography>}>
                      <DeleteOutlineIcon
                        fontSize='large'
                        className='delete_icon'
                        onClick={() => DeleteDialogOpen(index)}
                        key={index}
                        />
                    </Tooltip>
                  }
                  {
                    currentSelectPokemon4 && index === 3 &&
                    <Tooltip title={<Typography style={{ fontSize: "15px" }}>ポケモンを削除</Typography>}>
                      <DeleteOutlineIcon
                        fontSize='large'
                        className='delete_icon'
                        onClick={() => DeleteDialogOpen(index)}
                        key={index}
                        />
                    </Tooltip>
                  }
                  {
                    currentSelectPokemon5 && index === 4 &&
                    <Tooltip title={<Typography style={{ fontSize: "15px" }}>ポケモンを削除</Typography>}>
                      <DeleteOutlineIcon
                        fontSize='large'
                        className='delete_icon'
                        onClick={() => DeleteDialogOpen(index)}
                        key={index}
                        />
                    </Tooltip>
                  }
                  {
                    currentSelectPokemon6 && index === 5 &&
                    <Tooltip title={<Typography style={{ fontSize: "15px" }}>ポケモンを削除</Typography>}>
                      <DeleteOutlineIcon
                        fontSize='large'
                        className='delete_icon'
                        onClick={() => DeleteDialogOpen(index)}
                        key={index}
                        />
                    </Tooltip>
                  }
                </Item>
              </Grid>
            ))}
          </Grid>
          <div className='btn_container'>
            <TextField
              className='party_name'
              id="standard-basic"
              label="パーティー名"
              variant="standard"
              //  パーティー名の値
              value={partyName}
              onChange={partyNameChange} />
            <Button
              className='register_btn'
              variant="contained"
              onClick={partyRegister}>
              登録
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
