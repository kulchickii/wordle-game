import styles from './CurrentWord.module.css'

export const CurrentWord = ({currentWord, isShowAlert}) => { 
  const remainingLetters = 5 - currentWord.length // оставшиеся кол-во символы в строке
  return <>
      {currentWord.split('').map((symbol, id) => 
        <div 
          className={`${styles.letter} ${isShowAlert ? styles.shake : ''}`} 
          key={id}
        >
            {symbol}
        </div>)}
  
      {Array(remainingLetters).fill().map((_, id) => <div className={styles.letter} key={id}></div>)}
    </>
  
}