import { useEffect, useState } from 'react'
import './App.css'
import wordsCollections from './data/wordsCollections.json'
import { Board } from './components/Board'
import { Keyboard } from './components/Keyboard'
import { onKeyboardCheckLetters } from './core/onKeyboardCheckLetters'
import { ResultGame } from './components/ResultGame'
import { getInitialState } from './core/getInitialState'
import { loadGameState } from './core/loadGameState'
import {cls} from './core/cls'


// 1. Раскрашивать буквы в строках со словами + 
// 2. Раскрашивать буквы на клавиатуре + 
// 3. При окончании игры выводить сообщение над рядами с буквами если проиграл, то говорить, какое слово было загадано +
// 4. Предлагать после окончания игры играть заново с новым словом +
// 5. Найти список английских слов и использовать для +
//    5а. генерации нового загаданного слова +
//    56. проверки, что слово существует, когда вы пытаетесь его ввести +
//    5в* можно вытащить этот список из исходников оригинальной игры
// 7* Сохранение состояния игры в локал сторадж + 
// 6. Написать тесты хотя бы на раскраску букв +

//проверить приложение полностью, функции вынести за пределы приложения+
//переделать функцию раскраски (принимать должна слово, а не букву)+
// Потестировать колбэки компонента клавиатуры +
// как все бужет готово,  написать тесты на компонент клавиатуры и проверить как работает клавиатура и колбэки +
//переписать клавиатуру, чтобы нормально выглядела+

//-----------------------------------------------------------------------------------------------------

function App() {
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [gameState, setGameState] = useState(loadGameState)

  const isWin = gameState.enteredWords.includes(gameState.targetWord);
  const isGameStop = isWin || gameState.enteredWords.length === 6;
  
  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState))
  }, [gameState])

  const handleLetterInput = (l) => setGameState(prev => { // добавляет букву    
    if (prev.currentWord.length < 5 
        && prev.enteredWords.length < 6 
        && !prev.enteredWords.includes(prev.targetWord)//на выйгрыш проверяю в момоенте
      ) {
      return { ...prev, currentWord: prev.currentWord + l.toLowerCase(), }
    }
    return prev
  })

  const handleSubmitWord = () => setGameState(prev => { //добавляет слово
    if (prev.currentWord.length !== 5) return prev

    if (!wordsCollections.words.includes(prev.currentWord)) {
      setIsShowAlert(true)
      setTimeout(() => setIsShowAlert(false), 1000)
      return prev
    }

    return {
      ...prev,
      enteredWords: [...prev.enteredWords, prev.currentWord],
      currentWord: '',
    }
  });

  const handleBackspace = () => setGameState(prev => { // удаление буквы
    if (prev.currentWord.length <= 0 ) return prev 
    return {
      ...prev,
      currentWord: prev.currentWord.slice(0, -1),
    }
  })

  return <>
    <div className='headers-container'>
      <h1>Wordle</h1>

      <ResultGame 
        isGameStop={isGameStop} 
        isWin={isWin} 
        targetWord={gameState.targetWord} 
        resetGame={()=>setGameState(getInitialState())} 
      />
    </div>

    <div className={cls("notification", isShowAlert && "show")} >not in word list</div>

    <Board
      targetWord={gameState.targetWord}
      enteredWords={gameState.enteredWords}
      currentWord={gameState.currentWord}
      isShowAlert={isShowAlert}
    />
    <Keyboard
      disabled={isGameStop}
      handleBackspace={handleBackspace}
      handleSubmitWord={handleSubmitWord}
      handleLetterInput={handleLetterInput}
      onKeyboardCheckLetters={onKeyboardCheckLetters(gameState.enteredWords, gameState.targetWord)}
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