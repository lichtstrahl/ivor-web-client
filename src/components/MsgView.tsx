import React, {ReactNode} from 'react'

import {User} from '../types/user'
import MessageList from "./primitive/MessageList/MessageList";
import {Button, Card, FormControl, InputGroup, ButtonGroup} from "react-bootstrap";
import {Message} from "../types/message";
import axios, {AxiosResponse} from 'axios'
import {BASE_URL, COOKIE_USER} from "../const";
import './style.css';
import {ServerAnswer} from "../types/serveranswer";
import {EvaluationRequest} from "../types/EvaluationRequest";
import {ReactCookieProps} from "react-cookie";

interface Props extends ReactCookieProps {
    user : User
};

enum CommunicationType {
    COMMUNICATION,
    COMMUNICATION_KEY,
    NONE
}

export default class MsgView extends React.Component<Props, {}> {
    private input:string = "";
    private user:User = this.props.user;
    private adapter:Array<Message> = [];
    private messageList:React.ReactNode = <MessageList messages={this.adapter}/>;
    private lastCommunicationType:CommunicationType = CommunicationType.NONE;
    private lastCommunicationID:number = -1;
    private visibleButtons:boolean = false;


    render() {
        let size:string = '90%';

        this.messageList = <MessageList messages={this.adapter}/>;
        let buttonPanel:ReactNode = <Card className="mx-auto" style={{width: size}}>
            <ButtonGroup>
                <Button variant={"success"} onClick={this.clickYes.bind(this)}>+</Button>
                <Button variant={"danger"} onClick={this.clickNo.bind(this)}>-</Button>
            </ButtonGroup>
        </Card>;

        if (!this.visibleButtons) {
            buttonPanel = <div></div>;
        }


        return (
            <div>
                <Card className="mx-auto" style={{width:size}}>
                    <Card.Body>Добро пожаловать, {this.user.realName}</Card.Body>
                </Card>
                {buttonPanel}
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
                var data = res.data.data;
                var answer:any = JSON.parse(JSON.stringify(data));
                console.log(res);
                console.log(answer);
                let msg:Message = {
                  content:res.data.data.answer,
                  author:null,
                  date: new Date()
                };
                this.adapter.push(msg);

                // Смотрим какого типа пришла коммуникация. Если она вообще пришла
                if (typeof answer.communication != 'undefined') {   // Пришла communication
                    this.lastCommunicationType = CommunicationType.COMMUNICATION;
                    this.lastCommunicationID = answer.communication;
                    this.visibleButtons = true;
                } else if (typeof answer.communication_key != 'undefined') { // Пришла communication_key
                    this.lastCommunicationType = CommunicationType.COMMUNICATION_KEY;
                    this.lastCommunicationID = answer.communication_key;
                    this.visibleButtons = true;
                } else {
                    this.lastCommunicationType = CommunicationType.NONE;
                    this.lastCommunicationID = -1;
                    this.visibleButtons = false;
                }

                this.forceUpdate();
            }, (error) => {
                console.log(error);
                this.lastCommunicationID = -1;
                this.lastCommunicationType = CommunicationType.NONE;
            });

        this.adapter.push(msg);
        input.value = "";
        this.forceUpdate();
    }

    clickYes = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
        this.visibleButtons = false;
        const requestBody:EvaluationRequest = {
            id:this.lastCommunicationID,
            type:(this.lastCommunicationType === CommunicationType.COMMUNICATION) ? "communication": "communication_key",
            eval: 1
        };

        axios.post(BASE_URL + "/api/evaluation", requestBody)
            .then((res:AxiosResponse) => {
               console.log(res);
            });
        this.forceUpdate();
    };

    clickNo = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
        this.visibleButtons = false;
        const requestBody:EvaluationRequest = {
            id:this.lastCommunicationID,
            type:(this.lastCommunicationType === CommunicationType.COMMUNICATION) ? "communication": "communication_key",
            eval: -1
        };

        axios.post(BASE_URL + "/api/evaluation", requestBody)
            .then((res:AxiosResponse) => {
               console.log(res);
            });

        this.forceUpdate();
    };
}