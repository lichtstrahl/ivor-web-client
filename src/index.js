import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route} from "react-router-dom"
import LoginView from "./components/LoginView";
import RegView from "./components/RegView";
import MsgView from "./components/MsgView";
import {compose, createStore} from "redux"
import {Provider} from "react-redux"


import {ActionType, parseAddTrackAction, parseSetCurrentActivity, parseSetCurrentUserAction} from "./types/action";

const initState =  {
    currentActivity: 0,
    currentUser: {},
    tracks: []
};

// Данные неизменные
export function updateStore(_state, action) {
    if (typeof _state !== 'undefined') {
        let state = {
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
                state.tracks.push(parseAddTrackAction(action));
                return state;
            default:
                return state;
        }
    }
    return {};
}

const enhancer = compose(
    (window).__REDUX_DEVTOOLS_EXTENSION__ && (window).__REDUX_DEVTOOLS_EXTENSION__(),
        // persistState()
    );

// Передаётся reducer и начальное состояние
export const store = createStore(updateStore, initState, enhancer);

render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route  exact={true} path={"/register"} component={RegView} />
                <Route  exact={true} path={"/msg"}      component={MsgView} />
                <Route  exact={true} path={"/"}         component={LoginView}/>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById("root"));
