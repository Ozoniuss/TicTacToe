import './App.css';
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
  const [undoLocations, setUndoLocations] = useState([]); // the order in which the locations were clicked
  const [redoLocations, setRedoLocations] = useState([]);
  const [wasSquaresClicked, setWasSquaresClicked] = useState([
    false, false, false,
    false, false, false,
    false, false, false
  ]); //0 if clicked and

  const incrementTurn = () => { setTurn(turn + 1) };
  const isDraw = () => { return turn === 10 && !hasWonPlayer };

  const undo = () => {
    if (undoLocations.length !== 0) {
      let oldUndoLocations = undoLocations.slice();
      let oldRedoLocations = redoLocations.slice();
      let lastLocation = oldUndoLocations.pop(); //get the last square that was clicked
      oldRedoLocations.push(lastLocation); //and add it to the redo list

      setUndoLocations(oldUndoLocations); // reset the undo list
      setRedoLocations(oldRedoLocations); // reset the redo list


      let currentValues = values.slice(); // get the current values
      currentValues[lastLocation] = 0; // set the location back to 0
      setValues(currentValues);

      let newWasClickedValues = wasSquaresClicked.slice();
      newWasClickedValues[lastLocation] = false;
      setWasSquaresClicked(newWasClickedValues);

      setTurn(turn - 1); // reset current turn
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // reset current player
    }
  }

  const redo = () => {
    if (redoLocations.length !== 0) {
      let oldUndoLocations = undoLocations.slice();
      let oldRedoLocations = redoLocations.slice();
      let lastLocation = oldRedoLocations.pop(); //get the last square that was clicked
      oldUndoLocations.push(lastLocation); //and add it to the undo list

      setUndoLocations(oldUndoLocations); // reset the undo list
      setRedoLocations(oldRedoLocations); // reset the redo list

      let currentValues = values.slice(); // get the current values
      currentValues[lastLocation] = currentPlayer; // set the location back to 0
      setValues(currentValues);

      let newWasClickedValues = wasSquaresClicked.slice();
      newWasClickedValues[lastLocation] = true;
      setWasSquaresClicked(newWasClickedValues);

      setTurn(turn - 1); // reset current turn
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // reset current player
    }
  }

  //only chnage square value if a player has moved
  const changeSquareValue = (location) => {

    // if the square was already clicked we don't have to do anything
    if (!wasSquaresClicked[location]) {
      //add the current positions to the undo list
      let oldUndoLocations = undoLocations.slice(); //copy the last order of locations
      oldUndoLocations.push(location);
      setUndoLocations(oldUndoLocations);
      setRedoLocations([]); //clear redo list

      console.log(oldUndoLocations);

      //change list of values
      let newValues = values.slice();
      newValues[location] = currentPlayer
      setValues(newValues);

      //change wasClickedList
      let newWasClickedValues = wasSquaresClicked.slice();
      newWasClickedValues[location] = true;
      setWasSquaresClicked(newWasClickedValues);

      if (checkWinner(currentPlayer, newValues)) {
        setHasWonPlayer(true);
        setUndoLocations([]); // clear the undo list if players won
        setRedoLocations([]);
        return;
      }

      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      incrementTurn();
    }

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
