import { describe, test, expect } from 'vitest'
import { onKeyboardCheckLetters } from './onKeyboardCheckLetters'

describe('функция onKeyboardCheckLetters', () => {
  //=====
  test('по всем буквам возвращает - "correct", т.е. буквы индентичные ', () => {
    const actualResult = onKeyboardCheckLetters(['sport'], 'sport')
    const expectedResult = new Map([
      ['s', 'correct'],
      ['p', 'correct'],
      ['o', 'correct'],
      ['r', 'correct'],
      ['t', 'correct'],
    ])
    expect(actualResult).toEqual(expectedResult)
  })
  //=====
  test('по всем буквам возвращает - "absent", т.е. таких букв вообще нет', () => {
    const actualResult = onKeyboardCheckLetters(['check'], 'sport')
    const expectedResult = new Map([
      ['c', 'absent'],
      ['h', 'absent'],
      ['e', 'absent'],
      ['c', 'absent'],
      ['k', 'absent'],
    ])
    expect(actualResult).toEqual(expectedResult)
  })
  //=====
  test('"present" для букв, которые есть в слове, но не на своих местах', () => {
    const actualResult = onKeyboardCheckLetters(['teach'], 'react')
    const expectedResult = new Map([
      ['t', 'present'],
      ['e', 'correct'],
      ['a', 'correct'],
      ['c', 'correct'],
      ['h', 'absent'],
    ])

    expect(actualResult).toEqual(expectedResult)
  })
  //=====
  test('массив из трех слов (отрабатываетсы все три случая "present", "correct", "absent"])', () => {
    const actualResult = onKeyboardCheckLetters(['crane', 'react', 'tears'], 'great')
    const expectedResult = new Map([
      ['c', 'absent'],
      ['r', 'correct'],
      ['a', 'present'],
      ['n', 'absent'],
      ['e', 'present'],
      ['t', 'correct'],
      ['s', 'absent'],
    ])

    expect(actualResult).toEqual(expectedResult)
  })

  test('загадано curse, введено glove и sweat', () => {
    const actualResult = onKeyboardCheckLetters(['glove', 'sweat'], 'curse')
    const expectedResult = new Map([
      ['e', 'correct'],
      ['s', 'present'],

      ['a', 'absent'],
      ['w', 'absent'],
      ['t', 'absent'],
      ['g', 'absent'],
      ['v', 'absent'],
      ['o', 'absent'],
      ['l', 'absent'],
    ])

    expect(actualResult).toEqual(expectedResult)
  })


})