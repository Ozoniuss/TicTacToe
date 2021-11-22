import logo from './logo.svg';
import './App.css';
import Square from './Square';
import { useState } from 'react'
import Board from './Board';
import Undo from './UndoButton';
import Redo from './RedoButton';

function App() {

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [values, setValues] = useState(
    [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]);

  const [hasWonPlayer, setHasWonPlayer] = useState(false);
  const [turn, setTurn] = useState(1);
  const [undoList, setUndoList] = useState([]);
  const [redoList, setRedoList] = useState([]);

  const incrementTurn = () => { setTurn(turn + 1) };
  const isDraw = () => { return turn === 10 && !hasWonPlayer };

  const undo = () => {
    if (undoList.length !== 0) {
      let OldUndoList = JSON.parse(JSON.stringify(undoList));
      let OldRedoList = JSON.parse(JSON.stringify(redoList));
      let oldValues = OldUndoList.pop(); // get the last list of values

      OldRedoList.push(oldValues);

      setUndoList(OldUndoList); // reset the undo list
      setRedoList(OldRedoList); // add the values to the redo list
      setValues(oldValues); // reset the values
      setTurn(turn - 1); // reset current turn
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // reset current player
    }
  }

  const redo = () => {
    if (redoList.length !== 0) {
      let OldUndoList = JSON.parse(JSON.stringify(undoList));
      let OldRedoList = JSON.parse(JSON.stringify(redoList));
      let oldValues = OldRedoList.pop(); // get the last list of values from the redo list

      OldUndoList.push(oldValues);

      setUndoList(OldUndoList); // reset the undo list
      setRedoList(OldRedoList); // add the values to the redo list
      setValues(oldValues); // reset the values
      setTurn(turn + 1); // reset current turn
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // reset current player
    }
  }

  //only chnage square value if a player has moved
  const changeSquareValue = (location) => {
    console.log(location);


    //add the current positions to the undo list
    let OldUndoList = JSON.parse(JSON.stringify(undoList));
    OldUndoList.push(values.slice());
    setUndoList(OldUndoList);

    //clear the redo list
    setRedoList([]);

    console.log(OldUndoList);

    let newValues = values.slice();
    newValues[location] = currentPlayer
    setValues(newValues);

    if (checkWinner(currentPlayer, newValues)) {
      setHasWonPlayer(true);
      setUndoList([]); // clear the undo list if players won
      return;
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    incrementTurn();

  }

  const checkWinner = (player, values) => {
    const winningPossibilities = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningPossibilities) {
      if (values[combination[0]] == player &&
        values[combination[1]] == player &&
        values[combination[2]] == player) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="container">
      <h4>Current player is {currentPlayer}</h4>
      <Board values={values} squareChanged={changeSquareValue}></Board>
      <div className='row mt-3'>
        <div className="col-7"></div>
        <div className="col">
          <Undo undo={undo} />
          <Redo redo={redo} />
        </div>
      </div>

      {hasWonPlayer ? <div>Congratulations, you win!</div> : <></>}
      {isDraw() ? <div>Draw!</div> : <></>}
    </div>
  );


}

export default App;
