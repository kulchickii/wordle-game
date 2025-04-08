import { getInitialState } from './getInitialState'

export const loadGameState = () => {
  if (localStorage.getItem("gameState") !== null) {
    return JSON.parse(localStorage.getItem("gameState"))
  }
  return getInitialState()
}