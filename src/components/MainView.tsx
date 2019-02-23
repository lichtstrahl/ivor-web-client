import LoginView from "./LoginView";
import MsgView from "./MsgView";
import RegView from "./RegView";

import * as React from 'react';
import {MainViewState} from "../const";
import {Redirect, Route, Switch} from "react-router";


// Login, Msg, Register
export default class MainView extends React.Component<{}, {}> {
    private currentActivity :MainViewState;
    private user :any;

    constructor(props : {}) {
        super(props);
        this.currentActivity = MainViewState.THIS;
        this.user = null;
    }

    render() {
        console.log("MainView: render");

        if (this.currentActivity == MainViewState.ACTIVITY_MSG) {
            this.currentActivity = MainViewState.THIS;
            return <Redirect to={'/msg'}/>;
        }

        return (
            <div>
                <main>
                    <Switch>
                        <Route
                            exact={true}
                            path={"/"}
                            component={()=>
                                <LoginView
                                    successfulLogin = {this.successfulLogin}
                                    failedLogin = {this.failedLogin}
                                    clickRegistration={this.clickRegistration}
                                />}
                        />
                        <Route
                            path={"/msg"}
                            component={() =>
                                <MsgView
                                    user={this.user}
                                />
                            }
                        />
                        <Route
                            path={"/reg"}
                            component={() =>
                                <RegView
                                    successfulRegistration={this.successfulRegistration}
                                />
                            }
                        />
                    </Switch>
                </main>
            </div>
        )


    }

    successfulLogin = (user:any) => {

        this.currentActivity = MainViewState.ACTIVITY_MSG;
        this.user = user;
        this.forceUpdate();
        console.log(user);

    };

    private logActivity = () => {
        console.log(this.currentActivity);
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

    failedLogin = (msg:string) => {
        alert("Failed: " + msg);
    };

}