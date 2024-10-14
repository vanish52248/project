// 管理画面のポケモン編集ボタンのダイアログのコンポーネント
import React, { useEffect } from 'react'

import axios from 'axios';
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
// 定数ファイルからのアイテム・性格・個性のインポート
import '../css/BattleRecordEditorEditDialog.css'

export default function BattleRecordEditorEditDialog(props: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // ②cookieを取得するインスタンスの作成
    const cookies = new Cookies();

    const router = RoutingLogic()

    // トークン認証時間切れの処理
    const toNotTokenAuthentication = () => {
        router.toNotTokenAuthentication();
    }

    // APIへ渡すデータの定義
    const data = {
        id: props.currentID,
        rank: props.currentRank,
        party_name: props.currentPartyName,
        result: props.currentResult,
    }

    // ダイアログ内の更新ボタンがクリックされた際の処理
    const handleEdit = () => {
        // ③axios.post()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
        axios.request({
            method: 'put',
            url: process.env.REACT_APP_API_URL + 'v1/battle_record_edit/',
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${cookies.get('accesstoken')}`
            }
        })
            .then(response => {
                props.setBattleRecordEditOpen(false);
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
        props.setBattleRecordEditOpen(false);
    };

    // テキストエリアで変更したランク名を管理画面側で保持する処理
    const rankChange = (event: any) => {
        props.setCurrentRank(() => event.target.value);
    };

    // テキストエリアで変更した結果を管理画面側で保持する処理
    const resultChange = (event: any) => {
        props.setCurrentResult(() => event.target.value);
    };

    return (
        <div className='battle_record_editor_dialog_wrapper'>
            <Dialog
                fullScreen={fullScreen}
                // UpdateIconクリック時のpropsを受け取りダイアログを表示
                open={props.setBattleRecordEditOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"登録済みランクバトル戦績編集"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className='rank_container'>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="demo-simple-select-autowidth-label3">対戦時のランク</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label3"
                                    id="demo-simple-select-autowidth"
                                    onChange={rankChange}
                                    label="ランク"
                                    value={props.currentRank}
                                >
                                    <MenuItem value="">
                                        <em>未選択</em>
                                    </MenuItem>
                                    <MenuItem value={props.currentRank === "未選択" ? "" : "beginner"}>ビギナー級</MenuItem>
                                    <MenuItem value={props.currentRank === "未選択" ? "" : "monsterBall"}>モンスターボール級</MenuItem>
                                    <MenuItem value={props.currentRank === "未選択" ? "" : "superBall"}>スーパーボール級</MenuItem>
                                    <MenuItem value={props.currentRank === "未選択" ? "" : "hyperBall"}>ハイパーボール級</MenuItem>
                                    <MenuItem value={props.currentRank === "未選択" ? "" : "masterBall"}>マスターボール級</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='result_container'>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="demo-simple-select-autowidth-label3">対戦結果</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label3"
                                    id="demo-simple-select-autowidth"
                                    onChange={resultChange}
                                    label="対戦結果"
                                    value={props.currentResult}
                                >
                                    <MenuItem value="">
                                        <em>未選択</em>
                                    </MenuItem>
                                    <MenuItem value={props.currentResult === "未選択" ? "" : "win"}>勝ち</MenuItem>
                                    <MenuItem value={props.currentResult === "未選択" ? "" : "lose"}>負け</MenuItem>
                                    <MenuItem value={props.currentResult === "未選択" ? "" : "draw"}>引き分け</MenuItem>
                                </Select>
                            </FormControl>
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
