export default function GameScore({xName, oName, winningName , scoreX, scoreO ,onAddingX, onAddingO, onClicking}){
    return <div id="game-score"> 
<ol className='score-X'>
    {xName.toUpperCase()}
   <li>{winningName === xName ? scoreX : '0' } </li>
    {winningName === xName ?  <button onClick={onAddingX} disabled={onClicking} >ADD💰</button> : 'RETRY☹'}
    </ol>
<ol className="score-O">
    {oName.toUpperCase()}
    <li>{winningName === oName ? scoreO : '0' } </li>
    {winningName === oName? <button onClick={onAddingO} disabled={onClicking}>ADD💰</button> : 'RETRY☹' }
    </ol>
    </div>
}