import React, {ReactNode} from 'react'
import {Message} from "../../../types/message";
import MessageItem from "../MessageItem/MessageItem";
import './style.css'

type Props = {
    messages: Array<Message>
}

export default class MessageList extends React.Component<Props, any> {
    render(): React.ReactNode {
        const messageElements:Array<ReactNode> = [];

        for (let i = 0; i < this.props.messages.length; i++) {
            const node:React.ReactNode  = <MessageItem key = {i} msg={this.props.messages[i]}/>;
            messageElements.push(node);
        }

        return (
            <div >
                <div className={"MessageList"}>
                    {messageElements}
                </div>
            </div>
        )
    }
}