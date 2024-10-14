// router-logic.tsx -> router.tsx -> App.tsx -> index.html
// 実際にPathを受け取った際のロジックを記載する
import { useNavigate } from "react-router-dom"

export const RoutingLogic = (): {
    toLogin: () => void,
    toSignUp: () => void,
    toMenu: () => void,
    toPartyRegister: () => void,
    toPokemonRegister: () => void,
    toBattleRecord: () => void,
    toPokemonSelectionRate: () => void,
    toEditor: () => void,
    toPokemonEditor: () => void,
    toPartyEditor: () => void,
    toBattleRecordEditor: () => void,
    toNotFound: () => void,
    toNotTokenAuthentication: () => void,
} => {
    const navigate = useNavigate();

    // ログイン画面
    const toLogin = () => {
        navigate("/");
    };

    // ログイン画面
    const toSignUp = () => {
        navigate("/signup");
    };

    // メニュー画面
    const toMenu = () => {
        navigate("/menu");
    };

    // パーティー登録画面
    const toPartyRegister = () => {
        navigate("/party_register");
    };

    // ポケモン登録画面
    const toPokemonRegister = () => {
        navigate("/pokemon_register");
    }

    // バトル戦績画面
    const toBattleRecord = () => {
        navigate("/battle_record");
    }

    // ポケモン選出率画面
    const toPokemonSelectionRate = () => {
        navigate("/pokemon_selection_rate");
    }

    // 登録済みフィールド編集画面
    const toEditor = () => {
        navigate("/editor");
    }

    // 登録済みポケモン管理画面
    const toPokemonEditor = () => {
        navigate("/pokemon_editor");
    }
    
    // 登録済みパーティー管理画面
    const toPartyEditor = () => {
        navigate("/party_editor");
    }
    
    // 登録済みランクバトル戦績管理画面
    const toBattleRecordEditor = () => {
        navigate("/battle_record_editor");
    }
    
    // NotFound画面
    const toNotTokenAuthentication = () => {
        navigate("/not_token_authentication");
    }

    // NotFound画面
    const toNotFound = () => {
        navigate("/*");
    }

    return {
        toLogin: toLogin,
        toSignUp: toSignUp,
        toMenu: toMenu,
        toPartyRegister: toPartyRegister,
        toPokemonRegister: toPokemonRegister,
        toBattleRecord: toBattleRecord,
        toPokemonSelectionRate: toPokemonSelectionRate,
        toEditor: toEditor,
        toPokemonEditor: toPokemonEditor,
        toPartyEditor: toPartyEditor,
        toBattleRecordEditor: toBattleRecordEditor,
        toNotTokenAuthentication: toNotTokenAuthentication,
        toNotFound: toNotFound,
    };
};
