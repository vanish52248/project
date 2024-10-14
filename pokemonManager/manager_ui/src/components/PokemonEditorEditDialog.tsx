// 管理画面のポケモン編集ボタンのダイアログのコンポーネント
import React from 'react'

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
// 定数ファイルからのアイテム・性格・個性のインポート
import { identityList, itemList, personalityList } from '../const_';
import '../css/PokemonEditorEditDialog.css'

export default function PokemonEditorEditDialog(props: any) {
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
        id: props.currentPokemonId,
        pokemonName: props.currentPokemonName,
        level: props.currentPokemonLevel,
        personality: props.currentPokemonpersonality,
        identity: props.currentPokemonIdentity,
        item: props.currentPokemonItem,
        hp: props.currentPokemonHp,
        attack: props.currentPokemonAttack,
        defence: props.currentPokemonDefence,
        specialAttack: props.currentPokemonSpecialAttack,
        specialDefence: props.currentPokemonSpecialDefence,
        speed: props.currentPokemonSpeed,
    }

    // ダイアログ内の更新ボタンがクリックされた際の処理
    const handleEdit = () => {
        // ③axios.post()のAPI取得のURLがクッキー認証が通ったもののみ取得する為、localhost:8000/v1/~
        axios.request({
            method: 'put',
            url: process.env.REACT_APP_API_URL + 'v1/pokemon_edit/',
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${cookies.get('accesstoken')}`
            }
        })
            .then(response => {
                props.setPokemonEditOpen(false);
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
        props.setPokemonEditOpen(false);
    };


    // テキストエリアで変更したポケモン名を管理画面側で保持する処理
    const pokemonChange = (event: any) => {
        props.setCurrentPokemonName(() => event.target.value);
    };

    // プルダウンで変更したLVを管理画面側で保持する処理
    const levelChange = (event: any) => {
        props.setCurrentPokemonLevel(() => event.target.value);
    };

    // プルダウンで変更した性格を管理画面側で保持する処理
    const personalityChange = (event: any) => {
        props.setCurrentPokemonPersonality(() => event.target.value);
    };

    // プルダウンで変更した個性を管理画面側で保持する処理
    const identityChange = (event: any) => {
        props.setCurrentPokemonIdentity(() => event.target.value);
    };

    // プルダウンで変更した持ち物を管理画面側で保持する処理
    const itemChange = (event: any) => {
        props.setCurrentPokemonItem(() => event.target.value);
    };

    // テキストエリアで変更したHPを管理画面側で保持する処理
    const hpChange = (event: any) => {
        props.setCurrentPokemonHp(() => event.target.value);
    };

    // テキストエリアで変更した攻撃を管理画面側で保持する処理
    const attackChange = (event: any) => {
        props.setCurrentPokemonAttack(() => event.target.value);
    };

    // テキストエリアで変更した防御を管理画面側で保持する処理
    const defenceChange = (event: any) => {
        props.setCurrentPokemonDefence(() => event.target.value);
    };

    // テキストエリアで変更した特殊攻撃を管理画面側で保持する処理
    const specialAttackChange = (event: any) => {
        props.setCurrentPokemonSpecialAttack(() => event.target.value);
    };

    // テキストエリアで変更した特殊防御を管理画面側で保持する処理
    const specialDefenceChange = (event: any) => {
        props.setCurrentPokemonSpecialDefence(() => event.target.value);
    };

    // テキストエリアで変更した素早さを管理画面側で保持する処理
    const speedChange = (event: any) => {
        props.setCurrentPokemonSpeed(() => event.target.value);
    };

    return (
        <div className='pokemon_editor_dialog_wrapper'>
            <Dialog
                fullScreen={fullScreen}
                // PartyGrid内のUpdateIconクリック時のpropsを受け取りダイアログを表示
                open={props.setPokemonEditOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"登録済みポケモン情報編集"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className='pokemon_editor_pokemon_name'>
                        <TextField
                            id="outlined-basic"
                            label="ポケモン名"
                            variant="outlined"
                            // ポケモン名テキストエリアの値
                            onChange={pokemonChange}
                            value={props.currentPokemonName}
                            disabled={true}
                            />
                        </div>
                        <div className='pokemon_editor_pokemon_level'>
                        <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-autowidth-label3">レベル</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label3"
                                id="demo-simple-select-autowidth"
                                onChange={levelChange}
                                label="レベル"
                                value={props.currentPokemonLevel}
                                >
                                <MenuItem value="">
                                    <em>未選択</em>
                                </MenuItem>
                                <MenuItem value={props.currentPokemonLevel === "未選択" ? "" : 1}>LV: 1</MenuItem>
                                <MenuItem value={props.currentPokemonLevel === "未選択" ? "" : 50}>LV: 50</MenuItem>
                                <MenuItem value={props.currentPokemonLevel === "未選択" ? "" : 100}>LV: 100</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                        <div className='pokemon_editor_pokemon_personality'>
                        <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">性格</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                onChange={personalityChange}
                                label="性格"
                                value={props.currentPokemonPersonality}
                            >
                                <MenuItem value="">
                                    <em>未選択</em>
                                </MenuItem>
                                {/* 定数定義ファイルから取得した性格一覧をプルダウンに表示する */}
                                {personalityList.sort().map((element: string, index: number) => (
                                    <MenuItem
                                        value={props.currentPokemonPersonality === "未選択" ? "" : element}
                                        key={index}>
                                        {element}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </div>
                        <div className='pokemon_editor_pokemon_identity'>
                        <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-autowidth-label2">個性</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label2"
                                id="demo-simple-select-autowidth"
                                onChange={identityChange}
                                label="個性"
                                value={props.currentPokemonIdentity}
                            >
                                <MenuItem value="">
                                    <em>未選択</em>
                                </MenuItem>
                                {/* 定数定義ファイルから取得した個性一覧をプルダウンに表示する */}
                                {identityList.sort().map((element: string, index: number) => (
                                    <MenuItem
                                        value={props.currentPokemonIdentity === "未選択" ? "" : element}
                                        key={index}>
                                        {element}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </div>
                        <div className='pokemon_editor_pokemon_item'>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <InputLabel id="demo-simple-select-autowidth-label3">持ち物</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-3"
                                    id="demo-simple-select-autowidth"
                                    onChange={itemChange}
                                    label="持ち物"
                                    value={props.currentPokemonItem}
                                >
                                    <MenuItem value="">
                                        <em>未選択</em>
                                    </MenuItem>
                                    {/* 定数定義ファイルから取得した持ち物一覧をプルダウンに表示する */}
                                    {itemList.sort().map((element: string, index: number) => (
                                        <MenuItem
                                            value={props.currentPokemonItem === "未選択" ? "" : element}
                                            key={index}>
                                            {element}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='pokemon_editor_param_container'>
                            <TextField
                                className='pokemon_editor_hp_container'
                                id="outlined-basic"
                                label="HP"
                                variant="outlined"
                                // HPテキストエリアの値
                                value={props.currentPokemonHp}
                                onChange={hpChange}
                            />
                            <TextField
                                className='pokemon_editor_attack_container'
                                id="outlined-basic"
                                label="攻撃"
                                variant="outlined"
                                // 攻撃テキストエリアの値
                                value={props.currentPokemonAttack}
                                onChange={attackChange}
                            />
                            <TextField
                                className='pokemon_editor_defence_container'
                                id="outlined-basic"
                                label="防御"
                                variant="outlined"
                                // 防御テキストエリアの値
                                value={props.currentPokemonDefence}
                                onChange={defenceChange}
                            />
                            <TextField
                                className='pokemon_editor_special_attack_container'
                                id="outlined-basic"
                                label="特攻"
                                variant="outlined"
                                // 特殊攻撃テキストエリアの値
                                value={props.currentPokemonSpecialAttack}
                                onChange={specialAttackChange}
                            />
                            <TextField
                                className='pokemon_editor_special_defence_container'
                                id="outlined-basic"
                                label="特防"
                                variant="outlined"
                                // 特殊防御テキストエリアの値
                                value={props.currentPokemonSpecialDefence}
                                onChange={specialDefenceChange}
                            />
                            <TextField
                                className='pokemon_editor_speed_container'
                                id="outlined-basic"
                                label="素早さ"
                                variant="outlined"
                                // 素早さテキストエリアの値
                                value={props.currentPokemonSpeed}
                                onChange={speedChange}
                            />
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
