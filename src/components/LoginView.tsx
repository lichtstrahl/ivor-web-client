
import Login from "./forms/Login";
import Label from "./primitive/Label";
import * as React from 'react'
import {Button} from "react-bootstrap";
import {User} from "../types/user";

type LoginProps = {
    successfulLogin     : (user:User) => {},
    failedLogin          : (msg:string) => {},
    clickRegistration   : () => {}
}

export default class LoginView extends React.Component<any, any> {
    private readonly successfulLoginCallback     : (user:User) => {};
    private readonly failedLoginCallback         : (msg:string) => {};
    private readonly clickRegistrationCallback   : () => {};

    constructor(props: LoginProps) {
        super(props);
        this.successfulLoginCallback = props.successfulLogin;
        this.failedLoginCallback = props.failedLogin;
        this.clickRegistrationCallback = props.clickRegistration;
        console.log(this);
    }

    render() {
        return (
            <div>
                <Label text={"Вход"}/>
                <Login successfulLogin={this.successfulLoginCallback} failedLogin={this.failedLoginCallback}/>
                <Button variant={"outline-secondary"} onClick={this.clickRegistrationCallback}>Регистрация</Button>
            </div>
        )
    }
}