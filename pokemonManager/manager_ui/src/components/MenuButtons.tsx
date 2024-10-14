// メニュー画面でのメニュー項目ボタンのコンポーネント
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { RoutingLogic } from '../logic/router-logic';
import Paper from '@mui/material/Paper';

import '../css/MenuButton.css';

export default function MenuButtons() {

  const router = RoutingLogic()

  // パーティー登録画面
  const toPartyRegister = () => {
    router.toPartyRegister();
  }

  // ポケモン登録画面
  const toPokemonRegister = () => {
    router.toPokemonRegister();
  }

  // バトル戦績画面
  const toBattleRecord = () => {
    router.toBattleRecord();
  }

  // ポケモン選出率画面
  const toPokemonSelectionRate = () => {
    router.toPokemonSelectionRate();
  }

  // 登録済みフィールド編集画面
  const toEditor = () => {
    router.toEditor();
  }

  return (
    <>
      <Box
        className='button_container'>
        <Paper elevation={3} style={{marginBottom: "7%"}}>
          <Button
            className='button'
            style={{width: "100%"}}
            key="pokemon_register"
            onClick={toPokemonRegister}
          >
            ポケモン登録
          </Button>
        </Paper>
        <Paper elevation={3} style={{marginBottom: "7%"}}>
          <Button
            className='button'
            style={{width: "100%"}}
            key="party_register"
            onClick={toPartyRegister}
          >
            パーティー登録
          </Button>
        </Paper>
        <Paper elevation={3} style={{marginBottom: "7%"}}>
          <Button
            className='button'
            style={{width: "100%"}}
            key="battle_record"
            onClick={toBattleRecord}
          >
            ランクバトル戦績登録
          </Button>
        </Paper>
        <Paper elevation={3} style={{marginBottom: "7%"}}>
          <Button
            className='button'
           style={{width: "100%"}}
           key="pokemon_selection_rate"
           onClick={toPokemonSelectionRate}
          >
            相手ポケモン選出率
          </Button>
        </Paper>
        <Paper elevation={3} style={{marginBottom: "7%"}}>
          <Button
            className='button'
            style={{width: "100%"}}
            key="pokemon_editor"
            onClick={toEditor}
            >
            登録済データ管理
          </Button>
        </Paper>
        </Box>
    </>
  );
}
