import React from 'react'

export default class Label extends React.Component {

    constructor(props) {
       super(props);
       this.text = props.text;
    }

    render() {
        return (
            <div>
                {this.text}
            </div>
        )
    }
}