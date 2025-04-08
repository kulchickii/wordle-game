import { describe, test, expect } from 'vitest'
import { onKeyboardCheckLetters } from './onKeyboardCheckLetters'

describe('функция onKeyboardCheckLetters', () => {
  //=====
  test('по всем буквам возвращает - "correct", т.е. буквы индентичные ', () => {
    const actualResult = onKeyboardCheckLetters(['sport'], 'sport')
    const expectedResult = {
      s: 'correct',
      p: 'correct',
      o: 'correct',
      r: 'correct',
      t: 'correct',
    }
    expect(actualResult).toEqual(expectedResult)
  })
  //=====
  test('по всем буквам возвращает - "absent", т.е. таких букв вообще нет', () => {
    const actualResult = onKeyboardCheckLetters(['check'], 'sport')
    const expectedResult = {
      c: 'absent',
      h: 'absent',
      e: 'absent',
      k: 'absent',
    }
    expect(actualResult).toEqual(expectedResult)
  })
  //=====
  test('"present" для букв, которые есть в слове, но не на своих местах', () => {
    const actualResult = onKeyboardCheckLetters(['teach'], 'react')
    const expectedResult = {
      t: 'present',  // есть, но не на месте
      e: 'correct',
      a: 'correct',
      c: 'correct',
      h: 'absent',
    }

    expect(actualResult).toEqual(expectedResult)
  })
  //=====
  test('массив из трех слов (отрабатываетсы все три случая "present", "correct", "absent"])', () => {
    const actualResult = onKeyboardCheckLetters(['crane', 'react', 'tears'], 'great')
    const expectedResult = {
      c: 'absent',
      r: 'correct',
      a: 'present',
      n: 'absent',
      e: 'present',
      t: 'correct',
      s: 'absent',
    }

    expect(actualResult).toEqual(expectedResult)
  })


  test('если есть статус у буквы correct, то он не перебивается!!', () => {
    const actualResult = onKeyboardCheckLetters(['glove', 'sveat'], 'peace')
    const expectedResult = {
      'g': 'absent',
      'l': 'absent',
      'o': 'absent',
      'v': 'absent',
      'e': 'correct', //если , буква correct => return

      's': 'absent',
      'a': 'present',
      't': 'absent',
    

    
    }
    expect(actualResult).toEqual(expectedResult)
  })

})


/* 
  if (target[idx] === letter) return 'correct'
  if (target.includes(letter)) return 'present'
  return 'absent' */