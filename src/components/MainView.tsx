import LoginView from "./LoginView";
import MsgView from "./MsgView";
import RegView from "./RegView";

import * as React from 'react';
import {COOKIE_CURRENT_ACTIVITY, COOKIE_USER, MainViewState} from "../const";
import {Cookies, ReactCookieProps, withCookies} from "react-cookie";
import {Route} from "react-router";


interface Props extends ReactCookieProps {
}

// Login, Msg, Register
class MainView extends React.Component<Props, {}> {
    private currentActivity :MainViewState;
    private user :any;
    private cookie :Cookies|undefined;

    constructor(props : Props) {
        super(props);

        this.currentActivity = MainViewState.ACTIVITY_LOGIN;
        this.user = null;
        this.cookie = props.cookies;
        console.log(this.cookie);
        // this.cookie!.set(COOKIE_CURRENT_ACTIVITY, this.currentActivity);
    }

    render() {
        const loginView = <LoginView
            successfulLogin = {this.successfulLogin.bind(this)}
            failedLogin = {this.failedLogin.bind(this)}
            clickRegistration = {this.clickRegistration.bind(this)}
        />;
        const msgView = <MsgView user = {this.user}/>;
        const regView = <RegView successfulRegistration={this.successfulRegistration.bind(this)}/>;

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
                console.log("default");
        }

        return (
            <div>
                {/*<Route exact path={"/login"} component={LoginView}/>*/}

                {/*{view}*/}
            </div>
        )
    }

    successfulLogin = (user:any) => {
        this.currentActivity = MainViewState.ACTIVITY_MSG;

        this.user = user;

        console.log(user);
        if (this.cookie != null) {
            this.cookie.set(COOKIE_CURRENT_ACTIVITY, this.currentActivity);
            this.cookie.set(COOKIE_USER, this.user);
        }
    };

    successfulRegistration = () => {
        this.currentActivity = MainViewState.ACTIVITY_LOGIN;
        alert("Успешная регистрация");
        this.cookie!.set(COOKIE_CURRENT_ACTIVITY, this.currentActivity);
    };

    clickRegistration = () => {
        this.currentActivity = MainViewState.ACTIVITY_REG;
        this.cookie!.set(COOKIE_CURRENT_ACTIVITY, this.currentActivity);
    };

    failedLogin = (msg:string) => {
        alert("Failed: " + msg);
    };


    componentWillUnmount(): void {
        this.cookie!.remove(COOKIE_CURRENT_ACTIVITY);
    }
}

export default withCookies(MainView);