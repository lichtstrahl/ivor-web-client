import LoginView from "./LoginView";
import MsgView from "./MsgView";
import RegView from "./RegView";

import * as React from 'react';
import {MainViewState} from "../const";
import {render} from "react-dom";


// Login, Msg, Register
export default class MainView extends React.Component<any, any> {
    private currentActivity :MainViewState;
    private user :any;

    constructor(props : {}) {
        super(props);

        this.currentActivity = MainViewState.ACTIVITY_LOGIN;
        this.user = null;
    }

    render() {
        console.log("MainView: render");
        const loginView = <LoginView
            successfulLogin = {this.successfulLogin}
            failedLogin = {this.failedLogin}
            clickRegistration = {this.clickRegistration}
        />;
        const msgView = <MsgView user = {this.user}/>;
        const regView = <RegView successfulRegistration={this.successfulRegistration}/>;

        let view;
        switch (this.currentActivity) {
            case MainViewState.ACTIVITY_LOGIN:
                view =loginView;
                break;
            case MainViewState.ACTIVITY_MSG:
                view = msgView;
                break;
            case MainViewState.ACTIVITY_REG:
                view = regView;
                break;
            default:
                view = loginView;
        }

        return (
            <div>{view}</div>
        )
    }

    successfulLogin = (user:any) => {
        this.currentActivity = MainViewState.ACTIVITY_MSG;
        this.user = user;
        this.forceUpdate();
        console.log(user);
    };

    successfulRegistration = () => {
        this.currentActivity = MainViewState.ACTIVITY_LOGIN;
        this.forceUpdate();
        alert("Успешная регистрация");
    };

    clickRegistration = () => {
        this.currentActivity = MainViewState.ACTIVITY_REG;
        this.forceUpdate();
    };

    failedLogin = () => {
        alert("Failed");
    };

}