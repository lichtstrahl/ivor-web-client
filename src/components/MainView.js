import React from 'react'
import Login from "./forms/Login";
import Label from "./Label";

export default class MainView extends React.Component {
    render() {
        return (
            <div>
                <Label text={"Вход 2"}/>
                <Login />
            </div>
        )
    }
}