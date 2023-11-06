import { getInput } from '../utils.js';

const input = await getInput();
const literals = input.split('\n');

let total = 0;
for (const literal of literals) {
  let characters = 0;
  for (let i = 0; i < literal.length; i++) {
    switch (literal[i]) {
      case '"':
      case '\\':
        characters += 2;
        break;
      default:
        characters++;
    }
  }
  total += characters - literal.length + 2;
}
console.log(total);
