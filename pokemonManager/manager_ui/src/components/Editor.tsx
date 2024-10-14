// メニュー画面でのメニュー項目ボタンのコンポーネント
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { RoutingLogic } from '../logic/router-logic';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Header from './Header';
import ComponentTitle from './ComponentTitle';
import '../css/MenuButton.css';

export default function Editor() {

    const router = RoutingLogic()

    
    // ポケモン管理画面
    const toPokemonEditor = () => {
        router.toPokemonEditor();
    }

    // パーティー管理画面
    const toPartyEditor = () => {
        router.toPartyEditor();
    }

    // ランクバトル戦績管理画面
    const toBattleRecordEditor = () => {
        router.toBattleRecordEditor();
    }

    return (
        <>
            <Header />
            <Grid container alignItems="center" justifyContent="center" className='grid_wrapper'>
                <Grid item xs={4} className='menu_grid_item'>
                    <Paper className='menu_paper'>
                        <ComponentTitle title="管理画面" />
                        <Box
                            className='button_container'>
                            <Paper elevation={3} style={{ marginBottom: "7%" }}>
                                <Button
                                    className='button'
                                    style={{ width: "100%" }}
                                    key="pokemon_editor"
                                    onClick={toPokemonEditor}
                                >
                                    登録済みポケモン管理
                                </Button>
                            </Paper>
                            <Paper elevation={3} style={{ marginBottom: "7%" }}>
                                <Button
                                    className='button'
                                    style={{ width: "100%" }}
                                    key="party_editor"
                                    onClick={toPartyEditor}
                                >
                                    登録済みパーティー管理
                                </Button>
                            </Paper>
                            <Paper elevation={3} style={{ marginBottom: "7%" }}>
                                <Button
                                    className='button'
                                    style={{ width: "100%" }}
                                    key="battle_editor"
                                    onClick={toBattleRecordEditor}
                                >
                                    登録済みランクバトル戦績管理
                                </Button>
                            </Paper>
                            <a href="/menu">メニュー画面へ戻る</a>
                        </Box>
                    </Paper >
                </Grid>
            </Grid>
        </>
    );
}
