import React from 'react'
import axios, {AxiosResponse} from 'axios'
import {BASE_URL} from '../../const'
import {User} from "../../types/user";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

type LoginProps = {
    successfulLogin : ()=>{},
    failedLogin     : (msg:string)=>{}
}

type LoginState = {
    login: string,
    password: string
}

export default class Login extends React.Component<LoginProps,LoginState> {
    private readonly successfulLoginCallback: (user:User)=>{};
    private readonly failedLoginCallback: (msg:string)=>{};


    constructor(props:LoginProps) {
        super(props);

        this.successfulLoginCallback = props.successfulLogin;
        this.failedLoginCallback = props.failedLogin;


        this.state = {
            login : "",
            password: ""
        }
    }

    render() {
        return <form>
            <label>
                Login:
                <input type={"text"} name={"inputLogin"} placeholder={"логин"} onChange={this.changeLoginText} />
            </label>
            <br/>
            <label>
                Password:
                <input type={"password"} name={"inputPass"} placeholder={"Пароль"} onChange={this.changePasswordText}/>
            </label>
            <br/>
            <Button variant={"outline-primary"} onClick={this.clickLogin}>Войти</Button>
        </form>
    }

    clickLogin = (event:any) => {

        axios.post(BASE_URL + "/api/login", {login:this.state.login, pass:this.state.password})
            .then((res:AxiosResponse) => {
                let data = res.data;
                console.log(data);
                data.error == 0 ? (this.successfulLoginCallback(data.data)) : (this.failedLoginCallback(data.msg));
            });
        event.preventDefault(); // Чтобы избежать перезагрузки страницы
    };

    changeLoginText = (event:any) => {
        this.setState({login: event.target.value});
    };

    changePasswordText = (event:any) => {
        this.setState({password: event.target.value})
    };
}