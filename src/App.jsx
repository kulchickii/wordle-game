import { useEffect, useState } from "react";
import "./App.css";
import wordsCollections from "./data/wordsCollections.json";
import { Board } from "./components/Board";
import { Keyboard } from "./components/Keyboard";
import { onKeyboardCheckLetters } from "./core/onKeyboardCheckLetters";
import { ResultGame } from "./components/ResultGame";
import { getInitialState } from "./core/getInitialState";
import { loadGameState } from "./core/loadGameState";
import { cls } from "./core/cls";
import { getGameResult } from "./core/getGameStop";

function App() {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [gameState, setGameState] = useState(loadGameState);

  const gameResult = getGameResult(gameState);

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const handleLetterInput = (l) =>
    setGameState((prev) => {
      // добавляет букву
      if (prev.currentWord.length < 5 && getGameResult(prev) === "play") {
        //на выйгрыш проверяю в момоенте
        return { ...prev, currentWord: prev.currentWord + l.toLowerCase() };
      }
      return prev;
    });

  const handleSubmitWord = () =>
    setGameState((prev) => {
      //добавляет слово
      if (prev.currentWord.length !== 5) return prev;

      if (!wordsCollections.words.includes(prev.currentWord)) {
        setIsShowAlert(true);
        setTimeout(() => setIsShowAlert(false), 1000);
        return prev;
      }

      return {
        ...prev,
        enteredWords: [...prev.enteredWords, prev.currentWord],
        currentWord: "",
      };
    });

  const handleBackspace = () =>
    setGameState((prev) => {
      // удаление буквы
      if (prev.currentWord.length <= 0) return prev;
      return {
        ...prev,
        currentWord: prev.currentWord.slice(0, -1),
      };
    });

  return (
    <>
      <div className="headers-container">
        <h1>Wordle</h1>

        <ResultGame
          result={gameResult}
          targetWord={gameState.targetWord}
          resetGame={() => setGameState(getInitialState())}
        />
      </div>

      <div className={cls("notification", isShowAlert && "show")}>
        not in word list
      </div>

      <Board
        targetWord={gameState.targetWord}
        enteredWords={gameState.enteredWords}
        currentWord={gameState.currentWord}
        isShowAlert={isShowAlert}
      />
      <Keyboard
        disabled={gameResult !== "play"}
        handleBackspace={handleBackspace}
        handleSubmitWord={handleSubmitWord}
        handleLetterInput={handleLetterInput}
        onKeyboardCheckLetters={onKeyboardCheckLetters(
          gameState.enteredWords,
          gameState.targetWord,
        )}
      />
    </>
  );
}

export default App;
