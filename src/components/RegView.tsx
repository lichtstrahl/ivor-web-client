import * as React from 'react'

import Label from "./primitive/Label";
import Registration from "./forms/Registration";
import {Redirect} from "react-router";
import {User} from "../types/user";
import axios from "axios";
import {BASE_URL, OK} from "../const";
import {ServerAnswer} from "../types/serveranswer";


type Props = {

}

export default class RegView extends React.Component<Props, {}> {
    private endReg      :boolean                = false;
    private inputLogin  :HTMLInputElement|null  = null;
    private inputEmail  :HTMLInputElement|null  = null;
    private inputAge    :HTMLInputElement|null  = null;
    private inputName   :HTMLInputElement|null  = null;
    private inputCity   :HTMLInputElement|null  = null;
    private inputPass   :HTMLInputElement|null  = null;
    private inputPass2  :HTMLInputElement|null  = null;

    render() {
        if (this.endReg) {
            return <Redirect to={'/'}/>
        }

        return (
            <div>
                <Label text={"Регистрация"}/>
                <form onSubmit={this.registration.bind(this)}>
                    <input type={"text"} placeholder={"Реальное имя"}   ref={el => {this.inputName = el} }/><br/>
                    <input type={"text"} placeholder={"Email"}          ref={el => {this.inputEmail = el} }/><br/>
                    <input type={"text"} placeholder={"Возраст"}        ref={el => {this.inputAge = el} }/><br/>
                    <input type={"text"} placeholder={"Город"}          ref={el => {this.inputCity = el} }/><br/>
                    <input type={"text"} placeholder={"Логин"}          ref={el => {this.inputLogin = el} }/><br/>
                    <input type={"text"} placeholder={"Пароль"}         ref={el => {this.inputPass = el} }/><br/>
                    <input type={"text"} placeholder={"Повтор пароля"}  ref={el => {this.inputPass2 = el} }/><br/>
                    <input type={"submit"} value={"Зарегестрироваться"}/>
                </form>
            </div>
        );
    }

    registration(event:any) {
        if (this.correctInput()) {
            const usr:User = {
                realName:   this.inputName!.value,
                email:      this.inputEmail!.value,
                age:        parseInt(this.inputAge!.value, 10),
                city:       this.inputCity!.value,
                login:      this.inputLogin!.value,
                pass:       this.inputPass!.value,
                lastEntry:  new Date(),
                admin:      null
            }

            axios.post(BASE_URL + "/api/register", usr)
                .then((res) => {
                    if (res.status === 200) {
                        const answer:ServerAnswer = {
                            error: res.data.error,
                            msg: res.data.msg,
                            data:res.data.data
                        };

                        if (answer.error == OK) {
                            this.endReg = true;
                            this.forceUpdate();
                        } else {
                            alert(answer.msg);
                        }
                    } else {
                        alert("Ошибка на сервере");
                    }
                });
        }
        event.preventDefault();
    }

    correctInput() :boolean {
        console.log(this);
        let correctEmpty =
                this.inputName!.value.length !== 0
            &&  this.inputEmail!.value.length !== 0
            &&  this.inputAge!.value.length !== 0
            &&  this.inputCity!.value.length !== 0
            &&  this.inputLogin!.value.length !== 0
            &&  this.inputPass!.value.length !== 0
            &&  this.inputPass2!.value.length !== 0;
        if (!correctEmpty) {
            alert("Одно из полей не заполнено");
            return false;
        }

        let correctPassword = this.inputPass!.value === this.inputPass2!.value;
        if (!correctPassword) {
            alert("Пароли не совпадают");
            return false;
        }

        return true;
    }
}