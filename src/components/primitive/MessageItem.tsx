import React from 'react'
import {Message} from "../../types/message";
import {Card} from "react-bootstrap";


type Props = {
    msg:    Message
}

export default class MessageItem extends React.Component<Props, {}> {
    render(): React.ReactNode {
        return (
          <Card border={"primary"} style={{width: '18rem'}}>
              <Card.Header>{this.props.msg.author.realName}</Card.Header>
              <Card.Body>
                  <Card.Title>{this.props.msg.content}</Card.Title>
                  <Card.Text>{this.props.msg.date.toDateString()}</Card.Text>
              </Card.Body>
          </Card>
        );
    }
}