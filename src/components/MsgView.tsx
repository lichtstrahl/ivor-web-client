import * as React from 'react'

import {User} from '../types/user'
import ListView from "./primitive/ListView";
import MessageList from "./primitive/MessageList";
import {Message} from "../types/message";
import {Button, Card} from "react-bootstrap";

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
        let m1:Message = {
            content: "Контент",
            author: this.state.user,
            date: new Date()
        };

        let m2:Message = {
            content: "Сообщение",
            author: this.state.user,
            date: new Date()
        };

        let messages:Array<Message> = [m1, m2];
        return (
            <div>
                <Card className="mx-auto" style={{width:'50%'}}>
                    <Card.Body>Добро пожаловать, {this.state.user.realName}</Card.Body>
                </Card>
                <MessageList messages={messages}/>
                <Button variant={"dark"} size={"lg"}>Dark</Button>

            </div>
        )
    }
}