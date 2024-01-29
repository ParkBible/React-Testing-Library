import { ChangeEvent, useRef, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [accountId, setAccountId] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [isRed, setIsRed] = useState<boolean>(false);

    const idInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
        setAccountId(e.target.value);
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onButtonClick = () => {
        if (accountId === "") {
            idInput.current!!.focus();
        }

        if (password === "") {
            setIsRed(true);
        }
    }

    return (
        <div className="login-wrap">
            <button data-testid="home-button" onClick={() => navigate("/home")}>
                홈 화면으로 이동
            </button>
            <br/>
            <input className="id" type="text" placeholder="아이디를 입력하세요" onChange={e => onChangeId(e)} ref={idInput}/><br/>
            <input className={`password ${isRed && "red"}`} type="password" onChange={e => onChangePassword(e)} placeholder="비밀번호를 입력하세요"/><br/>
            <button data-testid="login-button" onClick={onButtonClick}>
                로그인
            </button>
        </div>
    );
}