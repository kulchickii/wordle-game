import wordsCollections from '../data/wordsCollections.json'

const randomNum = (length) => Math.floor(Math.random() * length)

export const getRandomWord = () => wordsCollections.words[randomNum(wordsCollections.words.length)]