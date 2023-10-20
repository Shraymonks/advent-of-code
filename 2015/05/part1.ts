import { getInput } from '../utils.js';

const input = await getInput();
const strings = input.split('\n');

const NAUGHTY_STRINGS = new Set(['ab', 'cd', 'pq', 'xy']);
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

const nice = strings.filter((s) => {
  let hasDoubleLetter = false;
  let previousLetter = '';
  let vowelCount = 0;

  for (const letter of s) {
    if (NAUGHTY_STRINGS.has(previousLetter + letter)) {
      return false;
    }
    if (VOWELS.has(letter)) {
      vowelCount++;
    }
    if (previousLetter === letter) {
      hasDoubleLetter = true;
    }
    previousLetter = letter;
  }

  return vowelCount >= 3 && hasDoubleLetter;
});

console.log(nice.length);
