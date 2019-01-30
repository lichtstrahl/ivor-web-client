import * as React from 'react'

import {User} from '../user'

type MsgProps = {
    user : User
}

type MsgState = {
    user : User
}

export default class MsgView extends React.Component<MsgProps, MsgState> {
    constructor(props:MsgProps) {
        super(props);

        this.state = {
            user : props.user
        }
    }

    render() {
        return (
            <div>
                <h1 color={"red"}>Привет {this.state.user.realName}</h1>
            </div>
        )
    }
}