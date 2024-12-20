import { getInput } from '../utils.mjs';

const input = await getInput();
const [patternsInput, designsInput] = input.split('\n\n');

const patterns = patternsInput.split(', ');
const designs = designsInput.split('\n');

let numPossible = 0;
for (const design of designs) {
  const q = [0];
  while (q.length > 0) {
    const i = q.pop();
    if (i === design.length) {
      numPossible++;
      break;
    }
    for (const pattern of patterns) {
      if (design.startsWith(pattern, i)) {
        q.push(i + pattern.length);
      }
    }
  }
}
console.log(numPossible);
