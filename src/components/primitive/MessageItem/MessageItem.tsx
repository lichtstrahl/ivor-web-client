import React from 'react'
import {Message} from "../../../types/message";
import {Card} from "react-bootstrap";
import './style.css'


type Props = {
    msg:    Message
}

export default class MessageItem extends React.Component<Props, {}> {
    render(): React.ReactNode {
        return (
          <Card className="mx-auto" id={"messageCard"} border={"primary"} style={{width:'50%', margin: '14px'}}>
              <Card.Header>{this.props.msg.author.realName}</Card.Header>
              <Card.Body id={"cardBody"}>
                  <Card.Title>{this.props.msg.content}</Card.Title>
                  <Card.Text>{this.props.msg.date.toDateString() + " " + this.props.msg.author.realName}</Card.Text>
              </Card.Body>
          </Card>
        );
    }
}