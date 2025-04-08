import { checkingLetter } from "./chekingLetter"

export const onKeyboardCheckLetters = (enteredWords, target) => {

  const collectionOfStatuses = {}

  for(let i = 0; i < enteredWords.length; i++) {
    const word = enteredWords[i].split('')

    for(let j=0; j < word.length; j++) {
      if(Object.hasOwn(collectionOfStatuses, word[j])) {
        if(collectionOfStatuses[word[j]] === 'correct') continue 
      } 
        collectionOfStatuses[word[j]] = checkingLetter(word[j], j, target ) //задается статус букве
    }

  }
  
  return collectionOfStatuses
}
