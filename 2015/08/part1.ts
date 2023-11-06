import { getInput } from '../utils.js';

const input = await getInput();
const literals = input.split('\n');

let total = 0;
for (const literal of literals) {
  let characters = 0;
  for (let i = 0; i < literal.length; i++) {
    switch (literal[i]) {
      case '"':
        break;
      case '\\':
        characters++;
        switch (literal[i + 1]) {
          case '\\':
          case '"':
            i++;
            break;
          default:
            i += 3;
        }
        break;
      default:
        characters++;
    }
  }
  total += literal.length - characters;
}
console.log(total);
