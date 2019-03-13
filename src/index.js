// import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route, Router} from "react-router-dom"
// import LoginView from "./components/LoginView";
// import RegView from "./components/RegView";
// import MsgView from "./components/MsgView";
// import {combineReducers, createStore} from "redux"
// import {Provider} from "react-redux"
// import reducers from '<project-path>/reducers'
// import {routerReducer} from "react-router-redux/src";
//
// const store = createStore(
//     combineReducers({
//         ...reducers,
//         routing: routerReducer
//     })
// );
//
// render((
//     <Provider store={store}>
//         <BrowserRouter>
//             <div>
//                 <Route exact path={"/"} component={LoginView} />
//                 <Route exact path={"/register"} component={RegView} />
//                 <Route exact path={"/msg"} component={MsgView} />
//             </div>
//         </BrowserRouter>
//     </Provider>
// ), document.getElementById("root"));

import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store';

const initState = {count:0};

function updateState(state, action) {
    switch (action.type) {
        case "INC":
            return {count: state.count + action.arg};

        case "DEC":
            return {count: state.count - action.arg};

        case "RESET":
            return {count: 0};
        default:
            return state;
    }
}

const incA =    {type: "INC",   arg: 1};
const decA =    {type: "DEC",   arg: 1};
const resetA =  {type: "RESET", arg: 0};

const store = new Store(initState, updateState);

class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }


    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    increment() {
        store.update(incA);
    }

    decrement() {
        store.update(decA);
    }

    reset() {
        store.update(resetA);
    }

    render() {
        return (
            <div className={"counter"}>
                <span className={"count"}>{store.state.count}</span>

                <div className={"buttons"}>
                    <button className={"decrement"} onClick={this.decrement}>-</button>
                    <button className={"increment"} onClick={this.increment}>+</button>
                    <button className={"reset"} onClick={this.reset}>reset</button>
                </div>

                <span className={"count"}>{store.state.count}</span>
            </div>
        );
    }
}

ReactDOM.render(<Counter/>, document.getElementById("root"));
