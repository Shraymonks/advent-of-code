import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

let sum = 0;
for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  const numbers = [...line.matchAll(/\d+/g)];

  for (const { 0: n, index } of numbers) {
    const leftIndex = index - 1;
    const rightIndex = index + n.length + 1; // Exclusive
    const adjacentChars =
      (lines[y - 1]?.substring(leftIndex, rightIndex) ?? '') +
      (lines[y + 1]?.substring(leftIndex, rightIndex) ?? '') +
      line.substring(leftIndex, index) +
      line.substring(rightIndex - 1, rightIndex);

    if (/[^\d.]/.test(adjacentChars)) {
      sum += Number(n);
    }
  }
}

console.log(sum);
