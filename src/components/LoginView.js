import React from 'react'
import Login from "./forms/Login";
import Label from "./primitive/Label";

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.successfulLoginCallback = props.successfulLogin;
        this.failedLoginCallback = props.failedLogin;
        this.clickRegistrationCallback = props.clickRegistration;
        console.log(this);
    }

    render() {
        return (
            <div>
                <Label text={"Вход 2"}/>
                <Login successfulLogin={this.successfulLoginCallback} failedLogin={this.failedLoginCallback}/>
                <button onClick={this.clickRegistrationCallback}>Регистрация</button>
            </div>
        )
    }

}