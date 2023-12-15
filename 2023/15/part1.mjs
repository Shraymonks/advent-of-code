import { getInput } from '../utils.mjs';

const input = await getInput();
const sequence = input.split(',');

let sum = 0;
for (const step of sequence) {
  let value = 0;
  for (const c of step) {
    value += c.charCodeAt(0);
    value *= 17;
    value %= 256;
  }
  sum += value;
}
console.log(sum);
