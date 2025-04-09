export const getGameResult = gameState => {
  const isWin = gameState.enteredWords.includes(gameState.targetWord);
  const isGameStop = isWin || gameState.enteredWords.length === 6;

  if (!isGameStop) {
    return "play";
  }
  return isWin ? "win" : "lose";
}