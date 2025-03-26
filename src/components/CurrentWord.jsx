import styles from './CurrentWord.module.css'

export const CurrentWord = ({currentWord}) => { 
  const remainingLetters = 5 - currentWord.length // оставшиеся кол-во символы в строке
  return <>
      {currentWord.split('').map((symbol, id) => <div className={styles.letter} key={id}>{symbol}</div>)}
  
      {Array(remainingLetters).fill().map((_, id) => <div className={styles.letter} key={id}></div>)}
    </>
  
}