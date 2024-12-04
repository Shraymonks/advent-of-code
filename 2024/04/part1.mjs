import { getInput } from '../utils.mjs';

const DIRS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const XMAS = ['X', 'M', 'A', 'S'];

const input = await getInput();
const lines = input.split('\n');

const yMax = lines.length;
const xMax = lines[0].length;

let count = 0;
for (let x = 0; x < xMax; x++) {
  for (let y = 0; y < yMax; y++) {
    for (const [dx, dy] of DIRS) {
      if (
        XMAS.every((char, i) => {
          const xi = x + dx * i;
          const yi = y + dy * i;
          return (
            xi >= 0 &&
            xi < xMax &&
            yi >= 0 &&
            yi < yMax &&
            lines[yi][xi] === char
          );
        })
      ) {
        count++;
      }
    }
  }
}
console.log(count);
