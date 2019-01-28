import React from 'react'
import LoginView from "./LoginView";
import CONST from "../const";
import MsgView from "./MsgView";
import RegView from "./RegView";


// Login, Msg, Register
export default class MainView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentActivity : CONST.ACTIVITY_LOGIN,
            user : null
        }
    }

    render() {
        const loginView = <LoginView
            successfulLogin = {this.successfulLogin}
            failedLogin = {this.failedLogin}
            clickRegistration = {this.clickRegistration}
        />;
        const msgView = <MsgView user = {this.state.user}/>;
        const regView = <RegView successfulRegistration={this.successfulRegistration}/>

        let view;
        switch (this.state.currentActivity) {
            case CONST.ACTIVITY_LOGIN:
                view =loginView;
                break;
            case CONST.ACTIVITY_MSG:
                view = msgView;
                break;
            case CONST.ACTIVITY_REG:
                view = regView;
                break;
            default:
                view = loginView;
        }

        return (
            <div>{view}</div>
        )
    }

    successfulLogin = (user) => {
        this.setState({
            currentActivity : CONST.ACTIVITY_MSG,
            user : user
        });
        console.log(user);
    };

    successfulRegistration = () => {
        this.setState({
           currentActivity : CONST.ACTIVITY_LOGIN
        });
        alert("Успешная регистрация");
    };

    clickRegistration = () => {
        this.setState({currentActivity : CONST.ACTIVITY_REG})
    };

    failedLogin = () => {
        alert("Failed");
    };

}