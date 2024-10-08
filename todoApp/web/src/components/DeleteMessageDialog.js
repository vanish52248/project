import * as React from 'react';

import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteMessageDialog = (props) => {

  // キャンセルボタンを押下した際の処理
  const handleDialogClose = () => {
    props.setOpen(false);
  };

  // 削除ボタンを押下した際の処理
  const handleDialogDelete = () => {
    // BEの削除APIよりタスクを削除する処理
    axios.delete(process.env.REACT_APP_API_URL + `/delete/${props.setId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        // 削除後にポップアップを閉じる処理=>トリガーでTOP画面側でデータを全取得する
        props.setOpen(false);
        
        // スナックバーの制御
        props.setOpenSnack(true);
        props.setMessage("タスクの削除が完了しました。");
        props.setSeverity("green");
      })
      .catch(error => {
        // スナックバーの制御
        props.setOpenSnack(true);
        props.setMessage(`タスクの削除に失敗しました。`);
        props.setSeverity("red");
      })
  };

  return (
    <>
      <Dialog
        open={props.setOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.setTitle === "" ? "無題" : props.setTitle} を削除しますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            内容: {props.setContent}<br />
            作成者: {props.setAuthor}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>キャンセル</Button>
          <Button onClick={handleDialogDelete}>削除</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteMessageDialog
