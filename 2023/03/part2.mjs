import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const rowNumbers = lines.map((line) => [...line.matchAll(/\d+/g)]);

function getRatio(x, y) {
  const numbers = rowNumbers.slice(Math.max(y - 1, 0), y + 2).flat();
  let numAdjacent = 0;
  let ratio = 1;
  for (const { 0: n, index } of numbers) {
    for (let x2 = index; x2 < index + n.length; x2++) {
      if (Math.abs(x2 - x) <= 1) {
        numAdjacent++;
        ratio *= Number(n);
        break;
      }
    }
  }
  return numAdjacent === 2 ? ratio : 0;
}

let sum = 0;
for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  for (let x = 0; x < line.length; x++) {
    if (line[x] === '*') {
      sum += getRatio(x, y);
    }
  }
}

console.log(sum);
