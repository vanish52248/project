import * as React from 'react';

import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

  // キャンセルボタンを押下した際の処理
  const handleDialogClose = () => {
    props.setOpen(false);
  };

  // 削除ボタンを押下した際の処理
  const handleDialogDelete = () => {
    // BEの削除APIよりタスクを削除する処理
    axios.delete(process.env.REACT_APP_LOCAL_API_URL + `/delete/${props.setId}`,  {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
  })
      .then(response => {
          props.setOpen(false);
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
          <Button onClick={handleDialogDelete}>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
