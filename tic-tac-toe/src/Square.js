import { useState } from "react"

export default function Square(props) {

    const [selected, setSelected] = useState(false);

    const squareClicked = () => {
        props.wasClicked();
        setSelected(true);
    }

    if (props.value === 0) {
        return (
            <div className="box" onClick={!selected ? squareClicked : null}>
                {props.value}
            </div>
        );
    }

    else if (props.value === 1) {
        return (
            <div className="box" onClick={!selected ? squareClicked : null}>
                {props.value}
            </div>
        );
    }

    else {
        return (
            <div className="box" onClick={!selected ? squareClicked : null}>
                {props.value}
            </div>
        );
    }

}