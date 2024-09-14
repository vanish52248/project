// router-logic.tsx -> router.tsx -> App.tsx -> index.html
// 実際にPathを受け取った際のロジックを記載する
import { useNavigate } from "react-router-dom"

const RoutingLogic = () => {

    const navigate = useNavigate();

    // メニュー画面
    const toTop = () => {
        navigate("/top");
    };

    // NotFound画面
    const toNotFound = () => {
        navigate("/*");
    }

    return {
        toTop: toTop,
        toNotFound: toNotFound,
    };
}

export default RoutingLogic
