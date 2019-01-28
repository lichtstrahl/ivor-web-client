import React from 'react'
import Label from "./primitive/Label";
import Registration from "./forms/Registration";

export default class RegView extends React.Component {
    constructor(props) {
        super(props);

        this.successfulRegistrationCallback = props.successfulRegistration;
    }

    render() {
        return (
            <div>
                <Label text={"Регистрация"}/>
                <Registration successfulRegistration={this.successfulRegistrationCallback}/>
            </div>
        )
    }
}