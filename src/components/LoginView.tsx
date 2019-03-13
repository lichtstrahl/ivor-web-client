
import Login from "./forms/Login";
import Label from "./primitive/Label";
import * as React from 'react'
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

type LoginProps = {
    successfulLogin     : () => {},
    failedLogin          : (msg:string) => {}
}

export default class LoginView extends React.Component<any, any> {
    private readonly failedLoginCallback        : (msg:string) => {};
    private readonly successfulLoginCallback    : ()=>{};
    private successfulLogin:boolean;

    constructor(props: LoginProps) {
        super(props);
        this.failedLoginCallback = props.failedLogin;
        this.successfulLoginCallback = props.successfulLogin;
        this.successfulLogin = false;
        console.log(this);
    }

    render() {
        return (
            <div>
                <Label text={"Вход"}/>
                <Login successfulLogin={this.successfulLoginCallback} failedLogin={this.failedLoginCallback}/>
                <Link to={'/register'}><Button variant={"outline-secondary"}>Регистрация</Button></Link>
            </div>
        )
    }

    // successfulLoginCallback = () => {
    //     this.successfulLogin = true;
    // }

}