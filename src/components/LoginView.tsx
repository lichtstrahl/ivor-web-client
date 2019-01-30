
import Login from "./forms/Login";
import Label from "./primitive/Label";
import * as React from 'react'
import {Button} from "react-bootstrap";

type LoginProps = {
    successfulLogin     : () => {},
    failedLogin          : () => {},
    clickRegistration   : () => {}
}

export default class LoginView extends React.Component<any, any> {
    private readonly successfulLoginCallback     : () => {};
    private readonly failedLoginCallback         : () => {};
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