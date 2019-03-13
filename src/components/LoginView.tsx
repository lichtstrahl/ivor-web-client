// import Label from "./primitive/Label";
// import * as React from 'react'
// import * as Redux from 'redux';
// import {Button} from "react-bootstrap";
// import {Link} from "react-router-dom";
//
// import {connect} from "react-redux";
// import axios, {AxiosResponse} from "axios";
// import {BASE_URL} from "../const";
// import {store} from "../index";
// import {func} from "prop-types";
// import {Action} from "redux";
//
// interface Props extends Action {
//     count:number
// }
//
// interface State {
//     currentState:string
// }
//
// class LoginView extends React.Component<Props, State> {
//     private successfulLogin :boolean;
//     private inputLogin      :string;
//     private inputPassword   :string;
//
//     constructor(props: Props) {
//         super(props);
//         this.successfulLogin = false;
//         this.inputLogin = "";
//         this.inputPassword = "";
//         console.log(this);
//         this.clickLogin.bind(this);
//         this.changeLoginText.bind(this);
//         this.changePasswordText.bind(this);
//     }
//
//     render() {
//         return (
//             <div>
//                 <Label text={"Вход"}/>
//                 <form>
//                     <label>
//                         Login:
//                         <input type={"text"} name={"inputLogin"} placeholder={"логин"} onChange={this.changeLoginText.bind(this)} />
//                     </label>
//                     <br/>
//                     <label>
//                         Password:
//                         <input type={"password"} name={"inputPass"} placeholder={"Пароль"} onChange={this.changePasswordText.bind(this)}/>
//                     </label>
//                     <br/>
//                     <Button variant={"outline-primary"} onClick={this.clickLogin.bind(this)}>Войти</Button>
//                 </form>
//                 <Link to={'/register'}><Button variant={"outline-secondary"}>Регистрация</Button></Link>
//             </div>
//         )
//     }
//
//     clickLogin = (event:any) => {
//         axios.post(BASE_URL + "/api/login", {login:this.inputLogin, pass:this.inputPassword})
//             .then((res:AxiosResponse) => {
//                 let data = res.data;
//                 console.log(data);
//                 // data.error == 0 ? (this.successfulLoginCallback(data.data)) : (this.failedLoginCallback(data.msg));
//
//             });
//         event.preventDefault(); // Чтобы избежать перезагрузки страницы
//     };
//
//     changeLoginText = (event:any) => {
//         this.inputLogin = event.target.value;
//     };
//
//     changePasswordText = (event:any) => {
//         this.inputPassword = event.target.value;
//         // this.setState({password: event.target.value})
//     };
// }
//
// function mapDispatchToProps(dispatch: Redux.Dispatch<Props>) {
//     return dispatch({type: "A_!", count: 0});
// }
//
// function mapStateToProps(state:State) {
//     return {label: "CurrentState: " + state.currentState};
// }
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(LoginView);

import * as React from "react";
import * as Redux from "react-redux";
import {addNewTrack} from "../action";

type PropsStore = {
    globalStore:any
}

type PropsDispatch = {
    onAddTrack: (a:string) => void
}

type Props = PropsStore & PropsDispatch;

class LoginView extends React.Component<Props, any> {
    private inputTrack:HTMLInputElement|null = null;

    render(): React.ReactNode {
        console.log("Render login view: ",this.props.globalStore);
        return (
          <div>
              <input type={"text"} ref={(input) => {this.inputTrack = input}}/>
              <button onClick={this.addTrack.bind(this)}>Add track</button>
              <ul>
                  {this.props.globalStore.map((track:any, i:number) => <li key={i}>{track}</li>)}
              </ul>
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
}

// Передаётся две функции.
// 1 - Мапит state из Стора в Props React-компонента.
// 2 -
export default Redux.connect(
    state =>  {
        let prp:PropsStore = {
            globalStore:state
        };
        return prp;
    },
    dispatch => {
        let prp:PropsDispatch = {
          onAddTrack: (trackName:string) => {
              dispatch(addNewTrack(trackName))
          }
        };
        return prp;
    }
)(LoginView);