import { getInput } from '../utils.js';

const input = await getInput();

function lookAndSay(sequence: string): string {
  let lastChar = sequence[0]!;
  let count = 0;
  let result = '';
  for (const char of `${sequence} `) {
    if (lastChar !== char) {
      result += count + lastChar;
      count = 1;
      lastChar = char;
    } else {
      count++;
    }
  }
  return result;
}

let sequence = input;

for (let i = 0; i < 50; i++) {
  sequence = lookAndSay(sequence);
}

console.log(sequence.length);
