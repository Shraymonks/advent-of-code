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

const path = new Set();
let dir = 0;
let x = xStart;
let y = yStart;

while (true) {
  path.add(`${x},${y}`);
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

let loops = 0;
for (const pos of path) {
  const [xObs, yObs] = pos.split(',').map(Number);
  const seen = new Set();
  let dir = 0;
  let x = xStart;
  let y = yStart;

  while (true) {
    const state = `${x},${y}:${dir}`;
    if (seen.has(state)) {
      loops++;
      break;
    }
    seen.add(state);
    const [dx, dy] = DIRS[dir];
    const xNext = x + dx;
    const yNext = y + dy;
    if (xNext < 0 || xNext >= xMax || yNext < 0 || yNext >= yMax) {
      break;
    }
    if (grid[yNext][xNext] === '#' || (xNext === xObs && yNext === yObs)) {
      dir = (dir + 1) % DIRS.length;
    } else {
      x = xNext;
      y = yNext;
    }
  }
}
console.log(loops);
