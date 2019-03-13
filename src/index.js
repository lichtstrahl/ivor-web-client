import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route} from "react-router-dom"
import LoginView from "./components/LoginView";
import RegView from "./components/RegView";
import MsgView from "./components/MsgView";
import {createStore} from "redux"
import {Provider} from "react-redux"



const initState = [
    'Track 1'
];



// Данные неизменные
export function updateStore(state, action) {
    switch (action.type) {
        case "ADD":
            return [...state, action.name]; // Добавляем новое значение в массив и возвращаем новый массив
        default:
            return state;
    }
}
// Передаётся reducer и начальное состояние
export const store = createStore(updateStore, initState);

render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path={"/"} component={LoginView} />
                <Route exact path={"/register"} component={RegView} />
                <Route exact path={"/msg"} component={MsgView} />
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById("root"));




// import {createStore} from 'redux';
//
// const initState = [];
// // Данные неизменные
// function updateStore(state, action) {
//     switch (action.type) {
//         case "ADD":
//             return [...state, action.name]; // Добавляем новое значение в массив и возвращаем новый массив
//         default:
//             return state;
//     }
// }
//
// const store = createStore(updateStore, initState);
// store.subscribe(() => {
//    console.log("Store update:", store.getState());
// });
//
// store.dispatch({type: "ADD", name: "Smells like spirit"});
// store.dispatch({type: "ADD", name: "Enter Sandman"});




// import React from 'react';
// import ReactDOM from 'react-dom';
// import {createStore} from 'redux';
//
// const initState = {count:0};
//
// function reducer(state = {count: 0}, action) {
//     switch (action.type) {
//         case "INC":
//             return {count: state.count + action.arg};
//
//         case "DEC":
//             return {count: state.count - action.arg};
//
//         case "RESET":
//             return {count: 0};
//         default:
//             return state;
//     }
// }
//
// function incrementA(arg) {
//     return {type: "INC",   arg: arg};
// }
//
// function decrementA(arg) {
//     return {type: "DEC",   arg: arg};
// }
//
// function resetA() {
//     return {type: "RESET", arg: 0};
// }
//
// const store = createStore(reducer);
//
// class Counter extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.increment = this.increment.bind(this);
//         this.decrement = this.decrement.bind(this);
//         this.reset = this.reset.bind(this);
//     }
//
//
//     componentDidMount() {
//         store.subscribe(() => this.forceUpdate());
//     }
//
//     increment() {
//         let arg = parseInt(this.refs.arg.value || 1);
//         store.dispatch(incrementA(arg));
//     }
//
//     decrement() {
//         let arg = parseInt(this.refs.arg.value || 1);
//         store.dispatch(decrementA(arg));
//     }
//
//     reset() {
//         store.dispatch(resetA());
//     }
//
//     render() {
//         return (
//             <div className={"counter"}>
//                 <span className={"count"}>{store.getState().count}</span>
//
//                 <div className={"buttons"}>
//                     <button className={"decrement"} onClick={this.decrement}>-</button>
//                     <button className={"increment"} onClick={this.increment}>+</button>
//                     <button className={"reset"} onClick={this.reset}>reset</button>
//                 </div>
//
//                 <input type={"text"} ref={"arg"} defaultValue={"1"}/>
//             </div>
//         );
//     }
// }
//
// ReactDOM.render(<Counter/>, document.getElementById("root"));
