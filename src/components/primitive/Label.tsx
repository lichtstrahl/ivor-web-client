import * as React from 'react'

interface LabelState {
    text: string
}

export default class Label extends React.Component<{}, LabelState> {

    constructor(props: {}) {
       super(props);
       this.state = {text: ""};
    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        )
    }
}