import React from 'react'
import {Message} from "../../../types/message";
import {Card} from "react-bootstrap";
import './style.css'
import {User} from "../../../types/user";


type Props = {
    msg:    Message
}

export default class MessageItem extends React.Component<Props, {}> {
    render(): React.ReactNode {
        const msg:Message = this.props.msg;
        const author:User|null = msg.author;
        let name:string = "***";
        let marginType:string = "";
        let idCard:string = "";

        if (author == null) {
            name = "Ivor";
            marginType="float-left";
            idCard = "cardIvor";
        } else {
            name = author.realName;
            marginType="float-right";
            idCard = "cardUser";
        }


        return (
            <Card className={marginType} id={"messageCard"} border={"primary"} style={{width:'50%', margin: '14px'}}>
                <Card.Header>{name}</Card.Header>
                <Card.Body id={idCard}>
                    <Card.Title>{msg.content}</Card.Title>
                    <Card.Text>{msg.date.toDateString() + " " + name}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}