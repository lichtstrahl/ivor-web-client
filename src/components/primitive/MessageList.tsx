import React, {ReactNode} from 'react'
import {Message} from "../../types/message";
import Label from "./Label";

type Props = {
    messages: Array<Message>
}

export default class MessageList extends React.Component<Props, any> {
    render(): React.ReactNode {

        const messageElements:Array<ReactNode> = [];

        for (let i = 0; i < this.props.messages.length; i++) {
            const node:React.ReactNode  = <li key={i}>{this.props.messages[i].content}</li>;
            messageElements.push(node);
        }

        return (
            <ul>
                {messageElements}
            </ul>
        )
    }
}