import React, {ReactNode} from 'react'
import {Message} from "../../../types/message";
import MessageItem from "../MessageItem/MessageItem";

type Props = {
    messages: Array<Message>
}

const Style = {
    overflow: "auto",
    background: "bisque",
    border: "1px solid gray",
    borderRadius: "5px",
    width: "50%",
    height: "500px",
    margin: "auto"
};

export default class MessageList extends React.Component<Props, any> {
    render(): React.ReactNode {
        const messageElements:Array<ReactNode> = [];

        for (let i = 0; i < this.props.messages.length; i++) {
            const node:React.ReactNode  = <MessageItem key = {i} msg={this.props.messages[i]}/>;
            messageElements.push(node);
        }

        return (
            <div style={Style}>
                    {messageElements}
            </div>
        )
    }
}