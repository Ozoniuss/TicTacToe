import logo from './logo.svg';
import './App.css';
import Square from './Square';
import {useState} from 'react'
import Board from './Board';

function App() {

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [values, setValues] = useState(
    [  
      0,0,0,
      0,0,0,
      0,0,0 
    ]);

  const changeSquareValue = (location) => {
    let newValues = values.slice();
    newValues[location] = currentPlayer
    setValues(newValues);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

  return (
    <>
      <h4>Current player is {currentPlayer}</h4>
      <Board values={values} squareChanged={changeSquareValue}></Board>
    </>
  );
}

export default App;
