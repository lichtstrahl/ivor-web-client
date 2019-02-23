// import React from 'react'
// import {render} from 'react-dom'
// import MainView from "./components/MainView";
// import {BrowserRouter} from "react-router-dom";
//
//
// render((
//     <BrowserRouter>
//         <MainView />
//     </BrowserRouter>
// ), document.getElementById("root"));

import {createStore} from 'redux';

function playList(state = [], action) {
    if (action.type === 'ADD_TRACK') {
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}

const store = createStore(playList);    // Хранилище всех данных в приложении

store.subscribe(() => {
   console.log('subscribe', store.getState());
});

store.dispatch({type: 'ADD_TRACK', payload: "Smells like spirit"});
store.dispatch({type: 'ADD_TRACK', payload: "Track 2"});