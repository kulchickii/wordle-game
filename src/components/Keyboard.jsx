import { useEffect } from 'react';
import styles from './Keyboard.module.css'

const ROWS = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm'
]

export const Keyboard = ({ handleBackspace, handleSubmitWord, handleLetterInput, onKeyboardCheckLetters, disabled }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (ROWS.join('').includes(key)) {
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
    <div className={styles.keyboard}>
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {rowIndex === 2 && 
            <button
              data-testid = 'el-enter'
              disabled={disabled}
              onClick={handleSubmitWord}
              className={`${styles.key} ${styles.enter}`}
            >
              enter↵
            </button>
          }
          {row.split('').map((letter) => {
            const check = Object.hasOwn(onKeyboardCheckLetters, letter);
            return (
              <button
                data-testid = {`el-${letter}`}
                disabled={disabled}
                key={letter}
                onClick={() => handleLetterInput(letter)}
                className={`${styles.key} ${check ? styles[onKeyboardCheckLetters[letter]] : ''}`}
              >
                {letter.toUpperCase()}
              </button>
            )
          })}
          {rowIndex === 2 && 
            <button
              data-testid = 'el-backspace'
              disabled={disabled}
              onClick={handleBackspace}
              className={`${styles.key} ${styles.backspace}`}
            >
            ⌫
            </button>
          }
        </div>
      ))}
    </div>
    )
}
