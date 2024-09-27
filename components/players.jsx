import { useState } from "react";

export default function Player({initialName, symbol, isActive, gameOverName}){
   const [playerName, setPlayerName] = useState(initialName);
   const [isEditing, setIsEditing] = useState(false);
   
   function playerNameHandler(event){
      setPlayerName(event.target.value);
    
   }
   
   function editHandler(){
      setIsEditing((editing)=> !editing); 
      if(isEditing){
         gameOverName(symbol, playerName);
      }
   }
 
   
   let namingPlayer = <span className="player-name" >{playerName} </span>;
   
   if(isEditing){
      namingPlayer = <input type="text" required value={playerName} onChange={playerNameHandler} />
   }
   
   return (
      <li className={isActive ? 'active': '' }> <span className="player">
        {namingPlayer}
       <span className="player-symbol" >{symbol}</span>
       </span>
       <button onClick={editHandler}>{isEditing? 'Save' : 'Edit'}</button> </li> 
)
}


  