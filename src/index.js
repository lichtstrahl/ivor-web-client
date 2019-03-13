import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route} from "react-router-dom"
import LoginView from "./components/LoginView";
import RegView from "./components/RegView";
import MsgView from "./components/MsgView";
import {createStore} from "redux"
import {Provider} from "react-redux"



const initState = [];



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
export const store = createStore(updateStore, initState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
