import { useState } from "react"
import Player from "../components/players.jsx"
import GameBoard from "../components/gameBoard.jsx"
import Log from "../components/log.jsx"
import GameOver from "../components/gameOver.jsx"
import GameScore from "../components/gameScore.jsx"
import { WINNING_COMBINATIONS } from "./WinningCombinations.js" 
import Rematching from "../components/rematching.jsx"

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS ={
  X : 'Player1',
  O : 'Player2'
}


function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(players){
  let currPlayer = 'X';
  if(players.length > 0 && players[0].player === 'X'){
   currPlayer = 'O';
  }
  return currPlayer;
}

function deriveWinner(gameBoard, players){
  let winner;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
  }
  }
  return winner;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const [currScoreX, setCurrScoreX] = useState(0);
  const [currScoreO, setCurrScoreO] = useState(0);
  const [buttonClick, setButtonClick] = useState(false);
  const [restarting, setRestarting] = useState(true);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function selectSqHandler(rowIndex, columnIndex){
    setGameTurns((prevTurns) => {
      const currPlayer = deriveActivePlayer(prevTurns);
      const newTurn = {
        square: {
          row : rowIndex,
          col : columnIndex
        },
        player : currPlayer,
    } 
    const updatedPlayer = [newTurn,...prevTurns]  /*This newTurn is added prior to ...prevTurns to maintain the list of turns having newest first */
    return updatedPlayer;
  })
}

function restartHandler(){
  setRestarting(true)
  setGameTurns([])
  setCurrScoreX(0)
  setCurrScoreO(0)
  setButtonClick(false) 
}

function gameOverNameHandler(symbol, newName){
  setPlayers( prevPlayers => {
    return {
      ...prevPlayers,
      [symbol]: newName
    };
  });
}
const scoreXHandler = () => {
  setCurrScoreX(currScoreX + 1); 
  setButtonClick(true);
}
const scoreOHandler = () => {
  setCurrScoreO(currScoreO + 1); 
  setButtonClick(true);
}

function restartingGameHandler(){
  setGameTurns([])
  setCurrScoreX(currScoreX)
  setCurrScoreO(currScoreO)
  setButtonClick(false) 
}

return (
  <main>
   {(winner || hasDraw) && <GameScore xName={players.X} oName={players.O} winningName={winner} scoreX={currScoreX} scoreO={currScoreO} onAddingX={scoreXHandler} onAddingO={scoreOHandler} onClicking ={buttonClick}/>}
    <div id="game-container">
   <ol id="players" className="highlight-player">
    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} gameOverName={gameOverNameHandler}/>
    <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} gameOverName={gameOverNameHandler}/>
   </ol>
   {(winner || hasDraw) && <GameOver winner={winner} onRestart={restartingGameHandler} /> }
  <GameBoard onSelectSq={selectSqHandler} board={gameBoard} />
  {currScoreX === 3 || currScoreO ===3 ? <Rematching winner={winner} onRematch={restartHandler}/>: ''}
  </div>
    <Log turns={gameTurns} />
  </main>
  )
}

export default App

