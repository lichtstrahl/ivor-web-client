import React from 'react'
import axios from 'axios'
import CONST from '../../const'

export default class Registration extends React.Component{
    constructor(props) {
        super(props);

        this.successfulRegistrationCallback = props.successfulRegistration;

        this.state = {
            realName : "",
            email : "",
            age : "",
            city : "",
            login : "",
            pass : "",
            pass2 : "",
        }

        this.inputRealName = <input
            type={"text"}
            placeholder={"Имя"}
            onChange={(event) => {this.setState({realName : event.target.value})}}
        />;

        this.inputEmail = <input
            type={"email"}
            placeholder={"Email"}
            onChange={(event) => {this.setState({email : event.target.value})}}
        />;
        this.inputAge = <input
            type={"text"}
            placeholder={"Возраст"}
            onChange={(event) => {this.setState({age : event.target.value})}}
        />;
        this.inputCity = <input
            type={"text"}
            placeholder={"Город"}
            onChange={(event) => {this.setState({city : event.target.value})}}
        />;
        this.inputLogin = <input
            type={"text"}
            placeholder={"Логин"}
            onChange={(event) => {this.setState({login : event.target.value})}}
        />;
        this.inputPassword = <input
            type={"text"}
            placeholder={"Пароль"}
            onChange={(event) => {this.setState({pass : event.target.value})}}
        />;
        this.inputPassword2 = <input
            type={"text"}
            placeholder={"Повтор пароля"}
            onChange={(event) => {this.setState({pass2 : event.target.value})}}
        />;
    }

    render() {
        return (
            <form onSubmit={this.registration}>
                {this.inputRealName}<br/>
                {this.inputEmail}<br/>
                {this.inputAge}<br/>
                {this.inputCity}<br/>
                {this.inputLogin}<br/>
                {this.inputPassword}<br/>
                {this.inputPassword2}<br/>
                <input type={"submit"} value={"Зарегестрироваться"}/>
            </form>
        )
    }


    registration = (event) => {
        if (this.correctInput()) {
            let user = {
                realName : this.state.realName,
                email : this.state.email,
                age : this.state.age,
                city : this.state.city,
                login : this.state.login,
                pass : this.state.pass,
                lastEntry : new Date().toDateString()
            };

            axios.post(CONST.BASE_URL + "/api/clients/insert", user)
                .then((res) => {
                    if (res.status === 200) {
                        this.successfulRegistrationCallback();
                    } else {
                        alert("Ошибка на сервере");
                    }
                });
        }
        event.preventDefault();

    };

    correctInput = function () {
        console.log(this);
        let correctEmpty =
            this.state.realName.length !== 0
            && this.state.email.length !== 0
            && this.state.age.length !== 0
            && this.state.city.length !== 0
            && this.state.login.length !== 0
            && this.state.pass.length !== 0
            && this.state.pass2.length !== 0;
        if (!correctEmpty) {
            alert("Одно из полей не заполнено");
            return false;
        }

        let correctPassword = this.state.pass === this.state.pass2;
        if (!correctPassword) {
            alert("Пароли не совпадают");
            return false;
        }

        return true;
    }

}