import { test, expect, describe } from 'vitest';
import { checkingLetter } from './chekingLetter';

const targetWord = 'peace'

describe('updateChildren', () => {
  test('проверка буквы наприсутсвие', () => {
    const actualResult = checkingLetter('e', 3, targetWord)
    const expectedResult = 'present'
    expect(actualResult).toEqual(expectedResult)
  });

  test('проверка буквы на ее местоположение в слове', () => {
    const actualResult = checkingLetter('a', 2, targetWord)
    const expectedResult = 'correct'
    expect(actualResult).toEqual(expectedResult)
  });

  test('буквы нет в целевом слове', () => {
    const actualResult = checkingLetter('z', 0, targetWord)
    const expectedResult = 'absent'
    expect(actualResult).toEqual(expectedResult)
  });

})

/* 
target - 'peace'

present (есть такая буква)
absent (нет такой буквы)
correct (буква на том месте) 

*/