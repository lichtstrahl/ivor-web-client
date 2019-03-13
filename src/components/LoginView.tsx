import * as React from "react";
import * as Redux from "react-redux";
import {addNewTrack, setCurrentActivity, setCurrentUser} from "../types/action";
import {State} from "../types/State";
import Label from "./primitive/Label";
import Button from "react-bootstrap/Button";
import {Link, Redirect} from "react-router-dom";
import {User} from "../types/user";
import {BASE_URL, MainViewState} from "../const";
import axios, {AxiosResponse} from "axios";

type PropsStore = {
    globalState:State
}

type PropsDispatch = {
    onAddTrack: (a:string) => void
    onSetCurrentUser: (usr:User) => void,
    onSetCurrentActivity: (activity:number) => void
}

type Props = PropsStore & PropsDispatch;

class LoginView extends React.Component<Props, any> {
    private inputTrack      :HTMLInputElement|null = null;
    private inputLogin      :HTMLInputElement|null = null;
    private inputPassword   :HTMLInputElement|null = null;

    constructor(props:Props) {
        super(props);
    }

    render(): React.ReactNode {
        let state:State = this.props.globalState;
        if (state.currentActivity == MainViewState.ACTIVITY_MSG) {
            return <Redirect to={"/msg"}/>
        }

        return (
                <div>
                    <Label text={"Вход"}/>
                    <form>
                      <label>
                          Login:
                          <input type={"text"} name={"inputLogin"} placeholder={"логин"} ref={(input) => {this.inputLogin = input}} />
                      </label>
                      <br/>
                      <label>
                          Password:
                          <input type={"password"} name={"inputPass"} placeholder={"Пароль"} ref={(input) => {this.inputPassword = input}}/>
                      </label>
                      <br/>
                      <Button variant={"outline-primary"} onClick={this.clickLogin.bind(this)}>Войти</Button>
                    </form>
                    <Link to={'/register'}><Button variant={"outline-secondary"}>Регистрация</Button></Link>
                </div>
        );
    }

    addTrack() {
        const input:string = this.inputTrack!.value;
        if (input.length != 0) {
            console.log("add track", this.inputTrack!.value);
            this.props.onAddTrack(this.inputTrack!.value);
            this.inputTrack!.value = '';
        }
    }

    clickLogin(event:any) {
        let log:string = this.inputLogin!.value;
        let pas:string = this.inputPassword!.value;
        axios.post(BASE_URL + "/api/login", {login:log, pass:pas})
            .then((res:AxiosResponse) => {
                let data:User = res.data.data;
                if (typeof data !== 'undefined') {
                    this.props.onSetCurrentUser(data);
                    this.props.onSetCurrentActivity(MainViewState.ACTIVITY_MSG);
                    localStorage.setItem("USER", JSON.stringify(data));
                } else {
                    alert(res.data.msg);
                }
            });
    }
}

export default Redux.connect(
    state =>  {
        let prp:PropsStore = {
            globalState:(state as State)
        };
        return prp;
    },
    dispatch => {
        let prp:PropsDispatch = {
            onAddTrack: (trackName:string) => {
                dispatch(addNewTrack(trackName))
            },
            onSetCurrentUser: (usr:User) => {
                dispatch(setCurrentUser(usr))
            },
            onSetCurrentActivity: (a:number) => {
                dispatch(setCurrentActivity(a));
            }
        };
        return prp;
    }
)(LoginView);