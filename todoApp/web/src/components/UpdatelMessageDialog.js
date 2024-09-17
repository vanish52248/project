import * as React from 'react';

import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const UpdateMessageDialog = (props) => {

  // 更新APIを処理する為に渡す変数(初期値としてTOP画面で開いたタスクの値を設定する)
  const [title, setTitle] = React.useState(props.setTitle)
  const [content, setContent] = React.useState(props.setContent)
  const [author, setAuthor] = React.useState(props.setAuthor)

  // キャンセルボタンを押下した際の処理
  const handleDialogClose = () => {
    props.setOpen(false);
  };

  // 更新ボタンを押下した際の処理
  const handleDialogUpdate = () => {

    // 更新APIへ渡すデータの定義
    const reqestDataOfJson = {
      Title: title,
      Content: content,
      Author: author
    }

    // BEの更新APIよりタスクを更新する処理
    axios.put(process.env.REACT_APP_LOCAL_API_URL + `/update/${props.setId}`, reqestDataOfJson, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        // 更新後にポップアップを閉じる処理=>トリガーでTOP画面側でデータを全取得する
        props.setOpen(false);

        // スナックバーの制御
        props.setOpenSnack(true);
        props.setMessage("タスクの更新が完了しました。");
        props.setSeverity("green");
      })
      .catch(error => {
        // スナックバーの制御
        props.setOpenSnack(true);
        props.setMessage(`タスクの更新に失敗しました。`);
        props.setSeverity("red");
      })
  }

  return (
    <>
      <Dialog
        open={props.setOpen}
        onClose={handleDialogClose}
      >
        <DialogContent>
          <DialogContentText>
            更新する内容を入力してください
          </DialogContentText>
          {/* タイトル */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            // 値をStateに設定することで変更を検知できる
            value={title}
            name="title"
            label="タイトル"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
          {/* タスク内容 */}
          <TextField
            margin="dense"
            id="content"
            // 値をStateに設定することで変更を検知できる
            value={content}
            name="content"
            label="タスク内容"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setContent(event.target.value)}
          />
          {/* 作成者 */}
          <TextField
            margin="dense"
            id="title"
            // 値をStateに設定することで変更を検知できる
            value={author}
            name="author"
            label="作成者"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>キャンセル</Button>
          <Button onClick={handleDialogUpdate}>更新</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateMessageDialog
