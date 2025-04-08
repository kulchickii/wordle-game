import {getRandomWord} from './getRandomWord'

export const getInitialState = () => ({
  enteredWords: [],
  currentWord: '',
  targetWord: getRandomWord()
});