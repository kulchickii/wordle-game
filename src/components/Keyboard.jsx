import { useEffect } from 'react';
import styles from './Keyboard.module.css'

const LETTERS = 'qwertyuiopasdfghjklzxcvbnm'

export const Keyboard = ({ handleBackspace, handleSubmitWord, handleLetterInput, onKeyboardCheckLetters, disabled }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (LETTERS.includes(key)) {
        handleLetterInput(key)
      }
      else if (key === 'enter') {
        handleSubmitWord()
      }
      else if (key === 'backspace') {
        handleBackspace()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className={styles.keyboard_module}>
      {LETTERS.split('').map(el => {
        const check = Object.hasOwn(onKeyboardCheckLetters, el) 
        return <button
          disabled={disabled}
          key={el}
          onClick={() => handleLetterInput(el)}
          className={`${check ? styles[onKeyboardCheckLetters[el]] : ''}`}
        >
          {el.toUpperCase()}
        </button>
      })}
      <button disabled={disabled} className={`${styles.backspace}`} onClick={() => handleBackspace()}>back</button>
      <button disabled={disabled} className={`${styles.enter}`} onClick={() => handleSubmitWord()}>enter</button>
    </div>
  );
}
