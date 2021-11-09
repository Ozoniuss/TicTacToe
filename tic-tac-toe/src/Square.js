import {useState} from "react"

export default function Square(props){

    if (props.value===0){
        return(
            <div className="container">
                {props.value}
            </div>
        );
    }

    if (props.value===1){
        return(
            <div className="container">
                {props.value}
            </div>
        );
    }

    if (props.value===2){
        return(
            <div className="container">
                {props.value}
            </div>
        );
    }

    return(<div/>)

}