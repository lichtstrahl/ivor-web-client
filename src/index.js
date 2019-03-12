import React from 'react'
import {render} from 'react-dom'
import MainView from "./components/MainView";
import {CookiesProvider} from "react-cookie";

render((
    <CookiesProvider>
        <MainView/>
    </CookiesProvider>
), document.getElementById("root"));
