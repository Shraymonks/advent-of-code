import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n');

let xStart;
let yStart;
const rows = grid.length;
const cols = grid[0].length;
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

const TARGET_STEPS = 26501365;
const offset = TARGET_STEPS % grid.length;

let i = 0;
const sampleSteps = [offset, grid.length + offset, grid.length * 2 + offset];
const sampleReachable = [];
const q = [
  {
    steps: 0,
    x: xStart,
    y: yStart,
  },
];

const evenSteps = new Set();
const oddSteps = new Set();
const visited = new Set();
while (i < sampleSteps.length) {
  const { steps, x, y } = q.shift();

  const key = `${x},${y}`;
  if (visited.has(key)) {
    continue;
  }
  if (steps > sampleSteps[i]) {
    const stepsSet = sampleSteps[i] % 2 === 0 ? evenSteps : oddSteps;
    sampleReachable.push(stepsSet.size);
    i++;
  }
  const stepsSet = steps % 2 === 0 ? evenSteps : oddSteps;
  stepsSet.add(key);
  visited.add(key);

  for (const [dx, dy] of MOVES) {
    const newX = x + dx;
    const newY = y + dy;
    const tile =
      grid[((newY % rows) + rows) % rows][((newX % cols) + cols) % cols];
    if (tile && tile !== '#') {
      q.push({
        steps: steps + 1,
        x: newX,
        y: newY,
      });
    }
  }
}
const [x0, x1, x2] = sampleSteps;
const [y0, y1, y2] = sampleReachable;
const x = TARGET_STEPS;
const reachable =
  (((x - x1) * (x - x2)) / ((x0 - x1) * (x0 - x2))) * y0 +
  (((x - x0) * (x - x2)) / ((x1 - x0) * (x1 - x2))) * y1 +
  (((x - x0) * (x - x1)) / ((x2 - x0) * (x2 - x1))) * y2;
console.log(reachable);
