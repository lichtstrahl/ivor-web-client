import * as React from 'react'

interface LabelState {
}

export default class Label extends React.Component<{}, LabelState> {
    private readonly text:string;

    constructor(props: {text:string}) {
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