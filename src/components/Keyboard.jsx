import { useEffect } from 'react';
import styles from './Keyboard.module.css'

const LETTERS = 'qwertyuiopasdfghjklzxcvbnm'

export const Keyboard = ({deleteLetter, pushWord, enteringWords, onKeyboardCheckLetters}) => {  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()      
      if (LETTERS.includes(key)) {
        enteringWords(key)
      }
      else if (key === 'enter') {
        pushWord()
      } 
      else if (key === 'backspace') {
        deleteLetter()
      }
    }
    document.addEventListener('keydown', handleKeyDown)    
    return () => document.removeEventListener('keydown', handleKeyDown)  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles.keyboard_module}>
    {LETTERS.split('').map(el =>{ 
      const check = onKeyboardCheckLetters.has(el)
      return <button 
        key = {el} 
        onClick={() => enteringWords(el)}
        className={`${check ? styles[onKeyboardCheckLetters.get(el)]: ''}`}
      >
        {el.toUpperCase()}
      </button>  
    })}
    <button className={`${styles.backspace}`} onClick={() => deleteLetter()}>back</button>
    <button  className={`${styles.enter}`} onClick={() => pushWord()}>enter</button>

  </div>
}
