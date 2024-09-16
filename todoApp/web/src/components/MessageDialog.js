import * as React from 'react';
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
    // TODO: axios.DELETE処理追加
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
          {props.setTitle} を削除しますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            内容: {props.setContent}<br/>
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
