import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n');

let xStart;
let yStart;
for (const [y, row] of grid.entries()) {
  const x = row.indexOf('S');
  if (x >= 0) {
    xStart = x;
    yStart = y;
    break;
  }
}

const MOVES = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const TARGET_STEPS = 64;
const PARITY = TARGET_STEPS % 2;

const q = [
  {
    steps: TARGET_STEPS,
    x: xStart,
    y: yStart,
  },
];

const reachableSteps = new Set();
const visited = new Set();

while (q.length) {
  const { steps, x, y } = q.shift();

  const key = `${x},${y}`;
  if (visited.has(key)) {
    continue;
  }
  if (steps % 2 === PARITY) {
    reachableSteps.add(key);
  }
  if (steps === 0) {
    continue;
  }
  visited.add(key);

  for (const [dx, dy] of MOVES) {
    const newX = x + dx;
    const newY = y + dy;
    const tile = grid[newY]?.[newX];
    if (tile && tile !== '#') {
      q.push({
        steps: steps - 1,
        x: newX,
        y: newY,
      });
    }
  }
}
console.log(reachableSteps.size);
