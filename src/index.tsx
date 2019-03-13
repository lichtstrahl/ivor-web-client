import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route} from "react-router-dom"
import LoginView from "./components/LoginView";
import RegView from "./components/RegView";
import MsgView from "./components/MsgView";
import {createStore, DeepPartial} from "redux"
import {Provider} from "react-redux"
import {State} from "./types/State";
import {
    Action,
    ActionType,
    parseAddTrackAction,
    parseSetCurrentActivity,
    parseSetCurrentUserAction
} from "./types/action";

const initState:DeepPartial<State> = {
    currentActivity: 0,
    currentUser: {},
    tracks: []
};

// Данные неизменные
export function updateStore(_state:DeepPartial<State>|undefined, action:Action<any>):DeepPartial<State> {
    if (typeof _state !== 'undefined') {
        let state:DeepPartial<State> = {
            currentActivity: _state.currentActivity,
            currentUser: _state.currentUser,
            tracks: _state.tracks
        };

        switch (action.type) {
            case ActionType.ACTION_SET_USER:
                state.currentUser = parseSetCurrentUserAction(action);
                return state;

            case ActionType.ACTION_SET_ACTIVITY:
                state.currentActivity = parseSetCurrentActivity(action);
                return state;

            case ActionType.ACTION_ADD_TRACK:
                state.tracks!.push(parseAddTrackAction(action));
                return state;
            default:
                return state;
        }
    }
    return {};
}
// Передаётся reducer и начальное состояние
export const store = createStore(updateStore, initState, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

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
