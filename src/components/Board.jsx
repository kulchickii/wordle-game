import styles from './Board.module.css'
import { CurrentWord } from './CurrentWord';
import { EmptyRow } from './EmptyRow';
import { Words } from './Words';

const COUNT_ROWS = 6
const COUNT_LETTERS = 5

export const Board = ({enteredWords, currentWord, targetWord, isShowAlert}) => {     
  const remainingRows = COUNT_ROWS - enteredWords.length - 1   // оставшиеся кол-во строк
  
  return <div className={styles.board}>
    {enteredWords.map((word, id) => 
      <Words targetWord = {targetWord} word = {word} key = {id}/>
    )}
    
    {remainingRows >= 0 && <CurrentWord currentWord = {currentWord} isShowAlert = {isShowAlert} />}
      
    {remainingRows > 0 && Array(COUNT_LETTERS).fill().map((_, id) => 
      <EmptyRow key = {id} remainingRows = {remainingRows}/> 
    )}
  </div>
}

