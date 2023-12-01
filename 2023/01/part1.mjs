import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

let sum = 0;
for (const line of lines) {
  const matches = Array.from(line.matchAll(/\d/g, ([match]) => match));
  const first = matches[0];
  const last = matches.at(-1);
  sum += Number(first + last);
}

console.log(sum);
