import { useEffect, useState } from 'react'
import './App.css'
import { Board } from './components/Board'
import { Keyboard } from './components/Keyboard'
import {onKeyboardCheckLetters} from './core/onKeyboardCheckLetters '
import { ResultGame } from './components/ResultGame'
import {randomNum} from './core/randomNum'
import wordsCollections from './data/wordsCollections.json'

// 1. Раскрашивать буквы в строках со словами + 
// 2. Раскрашивать буквы на клавиатуре + 
// 3. При окончании игры выводить сообщение над рядами с буквами если проиграл, то говорить, какое слово было загадано +

// 4. Предлагать после окончания игры играть заново с новым словом
// 5. Найти список английских слов и использовать для
//    5а. генерации нового загаданного слова
//    56. проверки, что слово существует, когда вы пытаетесь его ввести
//    5в* можно вытащить этот список из исходников оригинальной игры
// 6. Написать тесты хотя бы на раскраску букв
// Потестировать колбэки компонента клавиатуры
// 7* Сохранение состояния игры в локал сторадж

// узнать про события мыши


function App() {
  const [targetWord, setTargetWord] = useState('') //объеденить в один стейт, не получается по другому!
  const [gameState, setGameState] = useState({
    enteredWords: [], 
    currentWord: '', 
    isGameStop: false,
    isWin: false
  }) 
  
  
  useEffect(()=>{
    setTargetWord(wordsCollections.words[randomNum(wordsCollections.words.length)])
  }, [])
console.log(targetWord);
  useEffect(()=>{
    console.log(gameState)
  }, [gameState])
  
  const enteringWords = (l) => setGameState(prev => {
    if(!prev.isGameStop && prev.currentWord.length < 5 && prev.enteredWords.length < 6) {
      return {...prev, currentWord: prev.currentWord + l.toLowerCase(),}
    } 
    return prev
  })

  const pushWord = () => setGameState(prev => {
    if (prev.isGameStop || prev.currentWord.length !== 5) return prev     
      console.log('🎉🎉🎉🎉🎉', "1-",prev.currentWord, "2-", targetWord, prev.currentWord === targetWord );

    if (prev.currentWord === targetWord) {// проверка на победу
      
      
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

  const resetGame = () => {
    setTargetWord(wordsCollections.words[randomNum(wordsCollections.words.length)])
    setGameState(() => ({
        enteredWords: [], 
        currentWord: '', 
        isGameStop: false,
        isWin: false
    })      
)}


  return <> 
      <div className='headers-container'>
        <h1>Wordle</h1>
        {gameState.isGameStop &&<ResultGame isWin = {gameState.isWin} targetWord={targetWord} resetGame={resetGame}/>}
      </div>    

      <Board 
        targetWord={targetWord}
        enteredWords = {gameState.enteredWords} 
        currentWord = {gameState.currentWord}
      />
      <Keyboard 
        deleteLetter = {deleteLetter} 
        pushWord = {pushWord} 
        enteringWords = {enteringWords} 
        onKeyboardCheckLetters = {onKeyboardCheckLetters(gameState.enteredWords, targetWord)}
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