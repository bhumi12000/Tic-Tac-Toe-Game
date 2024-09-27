export default function GameBoard({onSelectSq, board}){
    return <ol id="game-board">
 {board.map((row, rowIndex) => <li key={rowIndex}>  {/**row = [null,null,null](each array of row), rowIndex = 0/1/2(array/row no.) */}
<ol>
    {row.map((eachColumn, columnIndex) =>(<li key={columnIndex}>  {/**eachColumn = null (each column/box of row), columnIndex = 0/1/2(array/column no.) */}
        <button onClick={() => onSelectSq(rowIndex, columnIndex)} disabled={eachColumn !== null}>{eachColumn}</button>
        </li> ))}
</ol>
 </li>)}
    </ol>
}

