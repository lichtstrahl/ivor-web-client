import React from 'react'

export default class MsgView extends React.Component {
    constructor(props) {
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