import { getInput } from '../utils.mjs';

const CORNERS = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];
const MMSS = 'MMSS';

const input = await getInput();
const lines = input.split('\n');

const yMax = lines.length - 1;
const xMax = lines[0].length - 1;

let count = 0;
for (let x = 1; x < xMax; x++) {
  for (let y = 1; y < yMax; y++) {
    if (lines[y][x] === 'A') {
      for (let rotation = 0; rotation < CORNERS.length; rotation++) {
        if (
          CORNERS.every(
            ([dx, dy], i) => lines[y + dy][x + dx] === MMSS.at(i - rotation),
          )
        ) {
          count++;
        }
      }
    }
  }
}
console.log(count);
