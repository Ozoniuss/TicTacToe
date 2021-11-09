import Square from "./Square"

export default function Board(props){

    const squareChanged = (location) => {
        console.log("muie");
        props.squareChanged(location);
    }

    return(
    <div className="container">
        <div className="row">
            <div className="col" onClick={() => squareChanged(0)}><Square value={props.values[0]}/></div>
            <div className="col" onClick={() => squareChanged(1)}><Square value={props.values[1]}/></div>
            <div className="col" onClick={() => squareChanged(2)}><Square value={props.values[2]}/></div>
        </div>
        <div className="row">
            <div className="col"onClick={() => squareChanged(3)} ><Square value={props.values[3]}/></div>
            <div className="col"onClick={() => squareChanged(4)}><Square value={props.values[4]}/></div>
            <div className="col"onClick={() => squareChanged(5)}><Square value={props.values[5]}/></div>
        </div>
        <div className="row">
            <div className="col"onClick={() => squareChanged(6)} ><Square value={props.values[6]}/></div>
            <div className="col"onClick={() => squareChanged(7)}><Square value={props.values[7]}/></div>
            <div className="col"onClick={() => squareChanged(8)}><Square value={props.values[8]}/></div>
        </div>
    </div>);
}