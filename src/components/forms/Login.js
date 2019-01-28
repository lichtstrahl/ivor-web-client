import React from 'react'
import axios from 'axios'
import CONST from '../../const'

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.successfulLoginCallback = props.successfulLogin;
        this.failedLoginCallback = props.failedLogin;

        this.state = {
            login : "",
            password: "",
        }
    }

    render() {
        return <form onSubmit={this.clickLogin}>
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
            <input type={"submit"} value={"Войти"}/>
        </form>
    }

    clickLogin = (event) => {

        axios.get(CONST.BASE_URL + "/api/clients")
            .then((res) => {
                let data = res.data;
                let index = null;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].login === this.state.login && data[i].pass === this.state.password) {
                        index = i;
                        break;
                    }
                }
                index != null ? (this.successfulLoginCallback(data[index])) : (this.failedLoginCallback());
            });
        event.preventDefault(); // Чтобы избежать перезагрузки страницы
    };

    changeLoginText = (event) => {
        this.setState({login: event.target.value});
    };

    changePasswordText = (event) => {
        this.setState({password: event.target.value})
    };
}