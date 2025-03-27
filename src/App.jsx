import { useEffect, useState } from 'react'
import './App.css'
import { Board } from './components/Board'
import { Keyboard } from './components/Keyboard'

// 1. Раскрашивать буквы в строках со словами
// 2. Раскрашивать буквы на клавиатуре
// 3. При окончании игры выводить сообщение над рядами с буквами если проиграл, то говорить, какое слово было загадано
// 4. Предлагать после окончания игры играть заново с новым словом
// 5. Найти список английских слов и использовать для
// 5а. генерации нового загаданного слова
// 56. проверки, что слово существует, когда вы пытаетесь его ввести
// 5в* можно вытащить этот список из исходников оригинальной игры
// 6. Написать тесты хотя бы на раскраску букв
// Потестировать колбэки компонента клавиатуры
// 7* Сохранение состояния игры в локал сторадж

// узнать про события мыши

const TARGET = 'peace'

function App() {
  const [gameState, setGameState] = useState({
    enteredWords: ['eeeee', 'fffff'], 
    currentWord: '', 
    isTargetWord: false,
  }) // храню введеные слова
  
  const enteringWords = (l) => setGameState(prev => {
    if(!prev.isTargetWord && prev.currentWord.length < 5 && prev.enteredWords.length < 6) {
      return {
        ...prev, 
        currentWord: prev.currentWord + l.toLowerCase(),
      }
    } 
    return prev
  })

  const pushWord = () => setGameState(prev => {   
    if (prev.isTargetWord || prev.enteredWords.length === 6) { // слово угадано или кончились попытки - сброс игры
      return {
        enteredWords: [],
        currentWord: '',
        isTargetWord: false,
      };
    }

    if (prev.currentWord.length !== 5) return prev //обязательно 5 букв

    if (prev.currentWord === TARGET) {// проверка на победу
      console.log('bingo🎉🎉🎉🎉');
      return {
        ...prev,
        enteredWords: [...prev.enteredWords, prev.currentWord],
        currentWord: '',
        isTargetWord: true
      };
    }  
   
    return { // обычное добавление слова
      ...prev,
      enteredWords: [...prev.enteredWords, prev.currentWord],
      currentWord: ''
    };
  });

  useEffect(()=>{
    console.log("Updated gameState:",gameState);
  },[gameState])

  const deleteLetter = () => setGameState(prev => {
    if (!prev.isTargetWord ) {
      return {
      ...prev, 
      currentWord: prev.currentWord.slice(0, -1),
    } 
    }
  })   
 
  return <>
      <h1>Wordle</h1>
      <Board 
        targetWord={TARGET}
        enteredWords = {gameState.enteredWords} 
        currentWord = {gameState.currentWord}
      />
      <Keyboard 
        deleteLetter = {deleteLetter} 
        pushWord = {pushWord} 
        enteringWords = {enteringWords} 
        />
  </> 
}

export default App


/* 
1. Приложение падает при вводе Enter на последнем слове (enter => слово добавляется/проверяется (последнее) => enter =>игра заново начинается)
2. Добавить проверку на выйгрыш слова
3. Логику обработки нажатия вынести в отдельный файл
4. добавить отображение клавиш(букв которые ввели)
*/


/* 
git add .
git commit -m "описание изменений"
git push origin main 
*/
