export const checkingLetter = (letter, idx, target) => { // 'e', 3, targetWord
  if (target[idx] === letter) return 'correct'
  if (target.includes(letter)) return 'present'
  return 'absent'
} 


/* 
  present (есть такая буква)
  absent (нет такой буквы)
  correct (буква на том месте) 
*/