import { checkingLetter } from "./chekingLetter"

export const onKeyboardCheckLetters = (enteredWords, target) => {
  
  const collectionOfStatuses = new Map()

  for(let i = 0; i < enteredWords.length; i++) {
    const word = enteredWords[i].split('')
       
    for(let j=0; j < word.length; j++) {
      if(!collectionOfStatuses.has(word[j])) {
        collectionOfStatuses.set(word[j], checkingLetter(word[j], j, target))
      }
    }

  }
  return collectionOfStatuses
}