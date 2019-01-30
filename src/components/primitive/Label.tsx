import * as React from 'react'

type LabelProps = {
    text:string;
}


export default class Label extends React.Component<LabelProps, any> {
    private readonly text:string;

    constructor(props: LabelProps) {
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