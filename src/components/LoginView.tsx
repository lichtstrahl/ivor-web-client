import * as React from "react";
import * as Redux from "react-redux";
import {addNewTrack, setCurrentActivity, setCurrentUser} from "../types/action";
import {State} from "../types/State";
import Label from "./primitive/Label";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import {Link, Redirect, withRouter} from "react-router-dom";
import {User} from "../types/user";
import {BASE_URL, MainViewState} from "../const";
import axios, {AxiosResponse} from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    private goToMsg         :boolean = false;

    constructor(props:Props) {
        super(props);
    }

    render(): React.ReactNode {
        if (this.goToMsg) {
            return <Redirect push={true} to={"/msg"}/>
        }

        return (
                <Container className={"mx-auto"} style={{width: "40%"}}>
                    <Row className={"justify-content-md-center"}>
                        <label>Вход</label>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        <Col >
                            <label>Login:</label>
                        </Col>
                        <Col>
                        <input type={"text"} name={"inputLogin"} placeholder={"логин"} ref={(input) => {this.inputLogin = input}} />
                        </Col>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        <Col>
                        <label>Password:</label>
                        </Col>
                        <Col>
                        <input type={"password"} name={"inputPass"} placeholder={"Пароль"} ref={(input) => {this.inputPassword = input}}/>
                        </Col>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                      <Button variant={"outline-primary"} onClick={this.clickLogin.bind(this)}>Войти</Button>
                    </Row>

                    <Row className={"justify-content-md-center"}>
                        <Link to={'/register'}><Button variant={"outline-secondary"}>Регистрация</Button></Link>
                    </Row>
                </Container>
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
                    // this.props.onSetCurrentActivity(MainViewState.ACTIVITY_MSG);
                    this.goToMsg = true;
                    localStorage.setItem("USER", JSON.stringify(data));
                    this.forceUpdate();
                } else {
                    alert(res.data.msg);
                }
            });
    }
}

// @ts-ignore
export default withRouter(Redux.connect(
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
)(LoginView));