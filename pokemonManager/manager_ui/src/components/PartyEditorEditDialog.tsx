// 管理画面のパーティー編集ボタンのダイアログのコンポーネント
import React, {useState, useEffect} from 'react'

import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import '../css/PartyEditorEditDialog.css'

export default function PartyEditorEditDialog(props: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // ②cookieを取得するインスタンスの作成
    const cookies = new Cookies();

    const router = RoutingLogic()

    // DBから取得した登録済みポケモンを格納する配列
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    

     // ダイアログオープン時に毎回最初に起動させる処理
     useEffect(() => {
        getPokemonList()
    },[])

    // トークン認証時間切れの処理
    const toNotTokenAuthentication = () => {
        router.toNotTokenAuthentication();
    }

    // 登録済みポケモン一覧をDBから取得する処理
    const getPokemonList = () => {
        // ③axios.get()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
        axios.request({
            method: 'GET',
            // ④header情報にcookieのアクセストークンを載せて通信する
            url: process.env.REACT_APP_API_URL + 'v1/party_edit_pokemon_info/',
            params: { party_name: props.currentPartyName},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${cookies.get('accesstoken')}`
            }
        })
        .then(response=>{
            response.data.records.forEach((element: any) => {
            // ループ前の配列を分解して新たにループ後のポケモン名を一つずつ格納する
            setPokemonList((prevState) => ([ ...prevState, element ]));
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

    // APIへ渡すデータの定義
    const data = {
        id: props.currentPartyId,
        partyName: props.currentPartyName,
    }

    // ダイアログ内の更新ボタンがクリックされた際の処理
    const handleEdit = () => {
        // ③axios.post()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
        axios.request({
            method: 'put',
            url: process.env.REACT_APP_API_URL + 'v1/party_edit/',
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${cookies.get('accesstoken')}`
            }
        })
            .then(response => {
                props.setPartyEditOpen(false);
                props.setOpenSnack(true);
                props.setSeverity("success");
                props.setMessage(`データを更新しました。`);
            })
            .catch(error => {
                // Token認証時間切れ時の処理→ログイン画面へ遷移
                if (error.response.status === 401) {
                    toNotTokenAuthentication();
                } else {
                    props.setOpenSnack(true);
                    // error.response.dataの中にAPIからraiseしてきたJSONの値が格納されている
                    window.console.error(`axios-FAILED:${JSON.stringify(error.response.data.error_message)}`);
                    props.setSeverity("error");
                    props.setMessage(error.response.data.error_message);
                }
            })
    }

    // ダイアログ内のキャンセルボタンをクリック時にダイアログを閉じる処理
    const handleClose = () => {
        props.setPartyEditOpen(false);
    };

    // テキストエリアで変更したパーティー名を管理画面側で保持する処理
    const partyChange = (event: any) => {
        props.setCurrentPartyName(() => event.target.value);
    };

    return (
        <div className='party_editor_dialog_wrapper'>
            <Dialog
                fullScreen={fullScreen}
                // UpdateIconクリック時のpropsを受け取りダイアログを表示
                open={props.setPartyEditOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"登録済みパーティー編集"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className='party_editor_party_name'>
                        <TextField
                            id="outlined-basic"
                            label="パーティー名"
                            variant="outlined"
                            // パーティー名テキストエリアの値
                            onChange={partyChange}
                            value={props.currentPartyName}
                            />
                        </div>
                        <div className='party_pokemon_wrapper'>
                            {pokemonList.map((element: string, index: number) => (
                                <p>
                                    {`${index+1}匹目: ${element}`}
                                </p>
                            ))}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        キャンセル
                    </Button>
                    <Button onClick={() => handleEdit()}>
                        更新
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
