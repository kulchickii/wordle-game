import { checkingLetter } from '../core/chekingLetter'; 
import styles from './Words.module.css'

export const Words = ({word, targetWord}) =>  
   word.split('').map((symbol, idx) => {
    return <div className={`${styles.letter} ${styles[checkingLetter(symbol, idx, targetWord)]}`} key = {idx}>
      {symbol}
    </div>
  })

  // виртуальная клавиатура
  // window обработчик

/*  
 present (есть такая буква)
  absent (нет такой буквы)
  correct (буква на том месте) */