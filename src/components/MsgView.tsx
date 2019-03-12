import React from 'react'

import {User} from '../types/user'
import MessageList from "./primitive/MessageList/MessageList";
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import {Message} from "../types/message";
import axios, {AxiosResponse} from 'axios'
import {BASE_URL} from "../const";
import './style.css';

type Props = {
    user : User
}

export default class MsgView extends React.Component<Props, {}> {
    private input:string = "";
    private user:User = this.props.user;
    private adapter:Array<Message> = [];
    private messageList:React.ReactNode = <MessageList messages={this.adapter}/>;

    render() {
        const m:Message = {
          author:this.user,
          content:"Init",
          date: new Date()
        };


        this.messageList = <MessageList messages={this.adapter}/>;


        let size:string = '90%';
        return (
            <div>
                <Card className="mx-auto" style={{width:size}}>
                    <Card.Body>Добро пожаловать, {this.user.realName}</Card.Body>
                </Card>

                {this.messageList}
                <div style={{width:size, margin:'auto'}}>
                    <InputGroup className={"mb-3"} >
                        <FormControl id={"input"} placeholder={"Введите сообщение"}/>
                        <InputGroup.Append>
                            <Button variant={"dark"} onClick={this.clickSend.bind(this)}>Отправить</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
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
                console.log(res);
                let msg:Message = {
                  content:res.data.data.answer,
                  author:null,
                  date: new Date()
                };
                this.adapter.push(msg);
                this.forceUpdate();
            }, (error) => {
                console.log(error);
            });

        this.adapter.push(msg);
        input.value = "";
        this.forceUpdate();
    }
}