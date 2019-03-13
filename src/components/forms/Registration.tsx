import React from 'react'
import axios from 'axios'
import {BASE_URL, OK} from '../../const'
import {User} from "../../types/user";
import {ServerAnswer} from "../../types/serveranswer";
import {Redirect} from "react-router";

type Props = {
    successfulRegistration : () => void
}

export default class Registration extends React.Component<Props, {}>{
    private readonly successfulRegistrationCallback : () => void;
    private readonly user : User;
    private pass: string;
    private pass2: string;
    private readonly inputRealName  : React.ReactNode;
    private readonly inputEmail     : React.ReactNode;
    private readonly inputAge       : React.ReactNode;
    private readonly inputCity      : React.ReactNode;
    private readonly inputLogin     : React.ReactNode;
    private readonly inputPassword  : React.ReactNode;
    private readonly inputPassword2 : React.ReactNode;
    private finishRegistration      : boolean;

    constructor(props:Props) {
        super(props);

        this.finishRegistration = false;
        this.successfulRegistrationCallback = props.successfulRegistration;
        this.pass = this.pass2 = "";
        this.user = {realName:"", email:"",city:"",age:0,login:"",pass:"",admin:null,lastEntry:new Date()};

        this.inputRealName = <input
            type={"text"}
            placeholder={"Имя"}
            onChange={(event) => {this.user.realName = event.target.value;}}
        />;
        this.inputEmail = <input
            type={"email"}
            placeholder={"Email"}
            onChange={(event) => {this.user.email = event.target.value;}}
        />;
        this.inputAge = <input
            type={"text"}
            placeholder={"Возраст"}
            onChange={(event) => {this.user.age = Number.parseInt(event.target.value,10);}}
        />;
        this.inputCity = <input
            type={"text"}
            placeholder={"Город"}
            onChange={(event) => {this.user.city = event.target.value;}}
        />;
        this.inputLogin = <input
            type={"text"}
            placeholder={"Логин"}
            onChange={(event) => {this.user.login = event.target.value;}}
        />;
        this.inputPassword = <input
            type={"text"}
            placeholder={"Пароль"}
            onChange={(event) => {this.pass = event.target.value;}}
        />;
        this.inputPassword2 = <input
            type={"text"}
            placeholder={"Повтор пароля"}
            onChange={(event) => {this.pass2 = event.target.value;}}
        />;
    }

    render() {
        if (this.finishRegistration) {
            return <Redirect to={'/'}/>
        }

        return (
            <form onSubmit={this.registration.bind(this)}>
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


    registration = (event:React.FormEvent) => {
        if (this.correctInput()) {
            this.user.lastEntry = new Date();
            this.user.pass = this.pass2;

            axios.post(BASE_URL + "/api/register", this.user)
                .then((res) => {
                    if (res.status === 200) {

                        const answer:ServerAnswer = {
                          error: res.data.error,
                            msg: res.data.msg,
                            data:res.data.data
                        };

                        if (answer.error == OK) {
                            this.finishRegistration = true;
                        } else {
                            alert(answer.msg);
                        }
                    } else {
                        alert("Ошибка на сервере");
                    }
                });
        }
        event.preventDefault();
    };

    correctInput() :boolean {
        console.log(this);
        let correctEmpty =
            this.user.realName.length !== 0
            && this.user.email.length !== 0
            && this.user.age.toString(10).length !== 0
            && this.user.city.length !== 0
            && this.user.login.length !== 0
            && this.pass.length !== 0
            && this.pass2.length !== 0;
        if (!correctEmpty) {
            alert("Одно из полей не заполнено");
            return false;
        }

        let correctPassword = this.pass === this.pass2;
        if (!correctPassword) {
            alert("Пароли не совпадают");
            return false;
        }

        return true;
    }
}