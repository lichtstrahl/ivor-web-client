import * as React from 'react'

import Label from "./primitive/Label";
import Registration from "./forms/Registration";

type RegProps = {
    successfulRegistration: () => void
}


export default class RegView extends React.Component<RegProps, {}> {
    private readonly successfulRegistrationCallback : () => void;

    constructor(props:RegProps) {
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