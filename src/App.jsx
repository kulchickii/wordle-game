import { useState } from 'react'
import './App.css'
import { Board } from './components/Board'
import { Keyboard } from './components/Keyboard'
import {onKeyboardCheckLetters} from './core/onKeyboardCheckLetters '
import { ResultGame } from './components/ResultGame'
// 1. Раскрашивать буквы в строках со словами + 
// 2. Раскрашивать буквы на клавиатуре + 

// 3. При окончании игры выводить сообщение над рядами с буквами если проиграл, то говорить, какое слово было загадано
// 4. Предлагать после окончания игры играть заново с новым словом
// 5. Найти список английских слов и использовать для
//    5а. генерации нового загаданного слова
//    56. проверки, что слово существует, когда вы пытаетесь его ввести
//    5в* можно вытащить этот список из исходников оригинальной игры
// 6. Написать тесты хотя бы на раскраску букв
// Потестировать колбэки компонента клавиатуры
// 7* Сохранение состояния игры в локал сторадж

// узнать про события мыши

const TARGET = 'peace'

function App() {
  const [gameState, setGameState] = useState({
    enteredWords: [], 
    currentWord: '', 
    isGameStop: false,
    isWin: false
  }) 
  
  const enteringWords = (l) => setGameState(prev => {
    if(!prev.isGameStop && prev.currentWord.length < 5 && prev.enteredWords.length < 6) {
      return {...prev, currentWord: prev.currentWord + l.toLowerCase(),}
    } 
    return prev
  })

  const pushWord = () => setGameState(prev => {     
    if (prev.isGameStop || prev.currentWord.length !== 5) return prev     

    if (prev.currentWord === TARGET) {// проверка на победу
      return {
        ...prev,
        enteredWords: [...prev.enteredWords, prev.currentWord],
        currentWord: '',
        isGameStop: true,
        isWin: true,
      }    
    }        
      
    if (prev.enteredWords.length + 1 === 6) { // условие окончание игры
      return { 
        ...prev, 
        enteredWords: [...prev.enteredWords, prev.currentWord], 
        currentWord: '',
        isGameStop: true, 
        isWin: false 
      };
    }
   
    return { // обычное добавление слова
      ...prev,
      enteredWords: [...prev.enteredWords, prev.currentWord],
      currentWord: ''
    };
  });

  const deleteLetter = () => setGameState(prev => { 
    if (prev.isGameStop) return prev

      return {
      ...prev, 
      currentWord: prev.currentWord.slice(0, -1),
    } 
    
  })   

  const resetGame = () => setGameState(() => ({
    enteredWords: [], 
    currentWord: '', 
    isGameStop: false,
    isWin: false
  }))


  return <> 
      <div className='headers-container'>
        <h1>Wordle</h1>
        {gameState.isGameStop &&<ResultGame isWin = {gameState.isWin} targetWord={TARGET} resetGame={resetGame}/>}
      </div>    

      <Board 
        targetWord={TARGET}
        enteredWords = {gameState.enteredWords} 
        currentWord = {gameState.currentWord}
      />
      <Keyboard 
        deleteLetter = {deleteLetter} 
        pushWord = {pushWord} 
        enteringWords = {enteringWords} 
        onKeyboardCheckLetters = {onKeyboardCheckLetters(gameState.enteredWords, TARGET)}
      />
  </> 
}

export default App


/* 
git add .
git commit -m "описание изменений"
git push origin main 
*/
//checking