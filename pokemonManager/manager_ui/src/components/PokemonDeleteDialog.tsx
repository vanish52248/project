// パーティー登録画面のポケモン削除ボタンのダイアログのコンポーネント
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function PokemonDeleteDialog(props: any) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // ダイアログ内の削除ボタンがクリックされた際の処理
    const handleDelete = () => {
      if (props.gridNo === 0) {
        props.setCurrentSelectPokemon1(null);
      } else if (props.gridNo === 1) {
        props.setCurrentSelectPokemon2(null);
      } else if (props.gridNo === 2) {
        props.setCurrentSelectPokemon3(null);
      } else if (props.gridNo === 3) {
        props.setCurrentSelectPokemon4(null);
      } else if (props.gridNo === 4) {
        props.setCurrentSelectPokemon5(null);
      } else if (props.gridNo === 5) {
        props.setCurrentSelectPokemon6(null);
      }
      props.setOpen(false);
      }

    // ダイアログ内のキャンセルボタンをクリック時にPartyGridのsetOpenの値をfalseに変更する処理
    const handleClose = () => {
        props.setOpen(false);
    };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        // PartyGrid内のDeleteIconクリック時のpropsを受け取りダイアログを表示
        open={props.setOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"登録済みポケモン削除"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.gridNo === 0 && `パーティー登録中の ${props.currentPokemon1} を削除しますか？`}
            {props.gridNo === 1 && `パーティー登録中の ${props.currentPokemon2} を削除しますか？`}
            {props.gridNo === 2 && `パーティー登録中の ${props.currentPokemon3} を削除しますか？`}
            {props.gridNo === 3 && `パーティー登録中の ${props.currentPokemon4} を削除しますか？`}
            {props.gridNo === 4 && `パーティー登録中の ${props.currentPokemon5} を削除しますか？`}
            {props.gridNo === 5 && `パーティー登録中の ${props.currentPokemon6} を削除しますか？`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            キャンセル
          </Button>
          <Button onClick={handleDelete}>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
