import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route, Router} from "react-router-dom"
import LoginView from "./components/LoginView";
import RegView from "./components/RegView";
import MsgView from "./components/MsgView";
import {combineReducers, createStore} from "redux"
import {Provider} from "react-redux"
import reducers from '<project-path>/reducers'
import {routerReducer} from "react-router-redux/src";

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    })
);

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

