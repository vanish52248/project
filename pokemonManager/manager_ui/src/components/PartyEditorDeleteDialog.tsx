// 管理画面のパーティー削除ボタンのダイアログのコンポーネント
import React from 'react'

import axios from 'axios';
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

export default function PartyDeleteDialog(props: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // ②cookieを取得するインスタンスの作成
    const cookies = new Cookies();

    const router = RoutingLogic()

    // トークン認証時間切れの処理
    const toNotTokenAuthentication = () => {
        router.toNotTokenAuthentication();
    }

    // ダイアログ内の削除ボタンがクリックされた際の処理
    const handleDelete = () => {
        // ③axios.post()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
        axios.request({
            method: 'DELETE',
            url: process.env.REACT_APP_API_URL + 'v1/party_delete/',
            params: { party_id: props.currentPartyId },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${cookies.get('accesstoken')}`
            }
        })
            .then(response => {
                props.setPartyDeleteOpen(false);
                props.setOpenSnack(true);
                props.setSeverity("success");
                props.setMessage(`登録済みデータから ${props.currentPartyName} が削除されました。`);
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
        props.setPartyDeleteOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                // PartyGrid内のDeleteIconクリック時のpropsを受け取りダイアログを表示
                open={props.setPartyDeleteOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"登録済みパーティー削除"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        登録データから {props.currentPartyName} を削除しますか？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        キャンセル
                    </Button>
                    <Button onClick={() => handleDelete()}>
                        削除
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
