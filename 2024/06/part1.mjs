import { getInput } from '../utils.mjs';

const DIRS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const input = await getInput();
const grid = input.split('\n');

const yMax = grid.length;
const xMax = grid[0].length;

const yStart = grid.findIndex((row) => row.includes('^'));
const xStart = grid[yStart].indexOf('^');

const seen = new Set();
let dir = 0;
let x = xStart;
let y = yStart;

while (true) {
  seen.add(`${x},${y}`);
  const [dx, dy] = DIRS[dir];
  const xNext = x + dx;
  const yNext = y + dy;
  if (xNext < 0 || xNext >= xMax || yNext < 0 || yNext >= yMax) {
    break;
  }
  if (grid[yNext][xNext] === '#') {
    dir = (dir + 1) % DIRS.length;
  } else {
    x = xNext;
    y = yNext;
  }
}

console.log(seen.size);
