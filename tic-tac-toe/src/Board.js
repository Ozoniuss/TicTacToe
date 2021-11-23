import Square from "./Square"

export default function Board(props) {

    const squareChanged = (location) => {
        props.squareChanged(location);
    }

    return (
        // <div className="container">
        //     <div className="row">
        //         <div className="col"><Square value={props.values[0]} wasClicked={() => squareChanged(0)}/></div>
        //         <div className="col" ><Square value={props.values[1]} wasClicked={() => squareChanged(1)}/></div>
        //         <div className="col" ><Square value={props.values[2]} wasClicked={() => squareChanged(2)}/></div>
        //     </div>
        //     <div className="row">
        //         <div className="col"  ><Square value={props.values[3]} wasClicked={() => squareChanged(3)}/></div>
        //         <div className="col" ><Square value={props.values[4]} wasClicked={() => squareChanged(4)}/></div>
        //         <div className="col" ><Square value={props.values[5]} wasClicked={() => squareChanged(5)}/></div>
        //     </div>
        //     <div className="row">
        //         <div className="col"  ><Square value={props.values[6]} wasClicked={() => squareChanged(6)}/></div>
        //         <div className="col" ><Square value={props.values[7]} wasClicked={() => squareChanged(7)}/></div>
        //         <div className="col" ><Square value={props.values[8]} wasClicked={() => squareChanged(8)}/></div>
        //     </div>
        // </div>)
        <div className="game-board">
            <Square value={props.values[0]} wasClicked={() => squareChanged(0)} />
            <Square value={props.values[1]} wasClicked={() => squareChanged(1)} />
            <Square value={props.values[2]} wasClicked={() => squareChanged(2)} />
            <Square value={props.values[3]} wasClicked={() => squareChanged(3)} />
            <Square value={props.values[4]} wasClicked={() => squareChanged(4)} />
            <Square value={props.values[5]} wasClicked={() => squareChanged(5)} />
            <Square value={props.values[6]} wasClicked={() => squareChanged(6)} />
            <Square value={props.values[7]} wasClicked={() => squareChanged(7)} />
            <Square value={props.values[8]} wasClicked={() => squareChanged(8)} />
        </div>
    );
}