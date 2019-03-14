import React, {ReactNode} from 'react'

import {User} from '../types/user'
import MessageList from "./primitive/MessageList/MessageList";
import {Button, ButtonGroup, Card, FormControl, InputGroup} from "react-bootstrap";
import {Message} from "../types/message";
import axios, {AxiosResponse} from 'axios'
import {BASE_URL} from "../const";
import './style.css';
import {EvaluationRequest} from "../types/EvaluationRequest";
import {State} from "../types/State";
import * as Redux from "react-redux";
import {Link, withRouter} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type PropsStore = {
    globalState:State
}

type PropsDispatch = {
    onClickYes  : () => void,
    onClickNo   : () => void
}

type Props = PropsStore & PropsDispatch;

enum CommunicationType {
    COMMUNICATION,
    COMMUNICATION_KEY,
    NONE
}

class MsgView extends React.Component<Props, any> {
    // private input:string = "";
    private user:User = this.props.globalState.currentUser;;
    private adapter:Array<Message> = [];
    private messageList:React.ReactNode = <MessageList messages={this.adapter}/>;
    private lastCommunicationType:CommunicationType = CommunicationType.NONE;
    private lastCommunicationID:number = -1;
    private visibleButtons:boolean = false;

    constructor(prp:Props) {
        super(prp);
        if (typeof this.user.realName === 'undefined') {
            this.user = JSON.parse(""+localStorage.getItem("USER"));
        }
    }

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
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>Добро пожаловать, {this.user.realName}</Col>
                                <Col><Link to={"/"}><Button>Сменить пользователя</Button></Link></Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
                {buttonPanel}
                {this.messageList}
                <div style={{width:size, margin:'auto'}}>
                    <InputGroup className={"mb-3"} >
                        <FormControl id={"input"} placeholder={"Введите сообщение"} />
                        <InputGroup.Append>
                            <Button variant={"dark"} onClick={this.clickSend.bind(this)}>Отправить</Button>
                            <Button variant={"warning"} onClick={this.clickReset.bind(this)}>Очистить</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        )
    }

    clickSend (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void {
        let input:HTMLInputElement = document.getElementById("input") as HTMLInputElement;

        let msg:Message = {
            content:input!.value,
            author:this.user,
            date: new Date()
        };
        console.log("Отправка", msg);

        axios.post(BASE_URL + "/api/request", {request: input.value})
            .then((res:AxiosResponse) => {
                var data = res.data.data;
                var answer:any = JSON.parse(JSON.stringify(data));
                console.log(res);
                console.log(answer);
                let msg:Message = {
                  content:answer.answer,
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

    clickReset():void {
        let input:HTMLInputElement = document.getElementById("input") as HTMLInputElement;
        this.adapter.length = 0;
        input.value = "";
        this.visibleButtons = false;
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

// @ts-ignore
export default withRouter(Redux.connect(
    state =>  {
        let prp:PropsStore = {
            globalState:(state as State)
        };
        return prp;
    },
    dispatch => {return {};}
)(MsgView));