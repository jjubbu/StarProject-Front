import React from "react";
import { apis } from "../lib/axios";

const Login = () => {

    const [loginInfo, setLoginInfo] = React.useState({"username":"","password":""});

    const inputValue = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({...prevState, [name]:value}))
    }

    const login = () => {
        console.log(loginInfo)
        apis.loginAX(loginInfo).then((response)=>{
            console.log(response);
        })
    }
      

    return (
        <React.Fragment>
            <h1>로그인</h1>
            <section>
            <label>
                <h3>아이디</h3>
                <input name="username" onChange={inputValue}/>
            </label>
            <label>
                <h3>비밀번호</h3>
                <input name="password" onChange={inputValue}/>
            </label>
            </section>
            <button onClick={login}>로그인</button>
            <button>회원가입</button>
        </React.Fragment>
    )
}

export default Login;