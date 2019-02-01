import React from 'react'

import {User} from '../types/user'
import MessageList from "./primitive/MessageList";
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import {Message} from "../types/message";
import axios, {AxiosResponse} from 'axios'
import {BASE_URL} from "../const";

type Props = {
    user : User
}

export default class MsgView extends React.Component<Props, {}> {
    private input:string = "";
    private user:User = this.props.user;
    private adapter:Array<Message> = [];
    private messageView:React.ReactNode = <MessageList messages={this.adapter}/>;

    render() {
        const m:Message = {
          author:this.user,
          content:"Init",
          date: new Date()
        };

        this.messageView = <MessageList messages={this.adapter}/>;

        return (
            <div>
                <Card className="mx-auto" style={{width:'50%'}}>
                    <Card.Body>Добро пожаловать, {this.user.realName}</Card.Body>
                </Card>
                {this.messageView}
                <InputGroup className={"mb-3"}>
                    <FormControl id={"input"} placeholder={"Введите сообщение"}/>
                    <InputGroup.Append>
                        <Button variant={"dark"} onClick={this.clickSend.bind(this)}>Отправить</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }

    clickSend (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void {
        console.log("Отправить");
        let input:any = document.getElementById("input");

        let msg:Message = {
            content:input.value,
            author:this.user,
            date: new Date()
        };

        axios.post(BASE_URL + "/api/request", {request: input.value})
            .then((res:AxiosResponse) => {
                let msg:Message = {
                  content:res.data.data,
                  author:this.user,
                  date: new Date()
                };
                this.adapter.push(msg);
                this.forceUpdate();
            }, (error) => {
                console.log(error);
            });

        this.adapter.push(msg);
        this.forceUpdate();
    }
}