
export const ResultGame = ({isWin, targetWord, resetGame}) => {
  return <div>
    {isWin ? 
      <h2>You Winner!🎉🎉🎉🎉</h2> 
      : <>
        <h2>You lost💩</h2> 
        <span>The hidden word: "{targetWord}"</span>
        </>
      }   
   <div>
     <span>Do you want to continue playing?</span>
     <button onClick={resetGame}>Yes</button>
     <button>No</button>
   </div>

    
    
  </div> 
}