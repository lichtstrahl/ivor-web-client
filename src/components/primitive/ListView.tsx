import React from 'react'

type Props = {}

export default class ListView extends React.Component<Props, any> {

    render(): React.ReactNode {
        const numbers = [1,2,3,4,5];
        const listItems = numbers.map((number) => <li>{number}</li>);
        return <ul color={"red"}>{listItems}</ul>
    }
}