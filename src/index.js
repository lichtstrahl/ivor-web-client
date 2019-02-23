// import React from 'react'
// import MainView from "./components/MainView";
// import {BrowserRouter} from "react-router-dom";
// import {createStore} from 'redux';
// import {render} from 'react-dom'
//
//
// render((
//     <BrowserRouter>
//         <MainView/>
//     </BrowserRouter>
// ), document.getElementById("root"));



import {createStore} from "redux";

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
const addTrackButton = document.querySelectorAll('.addTrack')[0];
const trackInput = document.querySelectorAll('.trackInput')[0];
const list = document.querySelectorAll('.list')[0];

store.subscribe(() => {
    list.innerHTML="";
    trackInput.value = '';
    store.getState().forEach(track => {
       const li = document.createElement('li');
       li.textContent =  track;
       list.appendChild(li);
    });

});



addTrackButton.addEventListener('click', () => {
    const track = trackInput.value;
    store.dispatch({type: 'ADD_TRACK', payload: track});
});
