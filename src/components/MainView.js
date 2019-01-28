import React from 'react'
import Login from "./forms/Login";
import Label from "./Label";

export default class MainView extends React.Component {
    render() {
        return (
            <div>
                <Label text={"Вход 2"}/>
                <Login successfulLogin={this.successfulLogin} failedLogin={this.failedLogin}/>
            </div>
        )
    }

    // Функция, которая будет вызываться при успешном залогинивании
    successfulLogin = () => {
        alert("YES");
    };

    // Функция, которая будет вызываться при неудаче логина
    failedLogin =() => {
        alert("NO");
    };
}