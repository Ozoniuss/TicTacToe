import logo from './logo.svg';
import './App.css';
import Square from './Square';
import {useState} from 'react'
import Board from './Board';
import Undo from './UndoButton';
import Redo from './RedoButton';

function App() {

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [values, setValues] = useState(
    [  
      0,0,0,
      0,0,0,
      0,0,0 
    ]);

  const [hasWonPlayer, setHasWonPlayer] = useState(false);

  const [turn, setTurn] = useState(1);

  const incrementTurn = () => {setTurn(turn+1)};

  const isDraw = () => {return turn == 10};

  const changeSquareValue = (location) => {
    console.log(location)
    let newValues = values.slice();
    newValues[location] = currentPlayer
    setValues(newValues);

    if (checkWinner(currentPlayer, newValues)){
      setHasWonPlayer(true);
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    incrementTurn();

  }

  const checkWinner = (player, values) => {
    const winningPossibilities = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (const combination of winningPossibilities){
        if (values[combination[0]] == player &&
            values[combination[1]] == player &&
            values[combination[2]] == player)
            {
              return true;
            }
      }
    return false;
  }

  if (hasWonPlayer){
    return (
      <>
        <h4>Current player is {currentPlayer}</h4>
        <h4>Congrats</h4>
      </>
    );
  }

  else if (!isDraw()){
    return (
      <div className="container">
        <h4>Current player is {currentPlayer}</h4>
        <Board values={values} squareChanged={changeSquareValue}></Board>
        <div className='row mt-3'>
          <div className="col-7"></div>
          <div className="col">
            <Undo/>
            <Redo/>
          </div>
        </div>
        
      </div>
    );
  }

  else
  {
    return(
      <>
        <h4>Current player is {currentPlayer}</h4>
        <h4>Draw</h4>
      </>
    );
  }

}

export default App;
