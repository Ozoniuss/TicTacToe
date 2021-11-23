import { useState } from "react"

export default function Square(props) {


    if (props.value === 0) {
        return (
            <div className="box" onClick={props.wasClicked}>
                {props.value}
            </div>
        );
    }

    else if (props.value === 1) {
        return (
            <div className="box" onClick={props.wasClicked}>
                {props.value}
            </div>
        );
    }

    else {
        return (
            <div className="box" onClick={props.wasClicked}>
                {props.value}
            </div>
        );
    }

}