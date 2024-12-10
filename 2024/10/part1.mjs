import { getInput } from '../utils.mjs';

const DIRS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const input = await getInput();
const grid = input.split('\n').map((row) => row.split('').map(Number));

const rows = grid.length;
const cols = grid[0].length;

const q = [];
const trailheads = new Map();

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === 0) {
      const start = `${x},${y}`;
      q.push({ height: 0, start, x, y });
      trailheads.set(start, new Set());
    }
  }
}

while (q.length > 0) {
  const { height, start, x, y } = q.pop();

  if (height === 9) {
    trailheads.get(start).add(`${x},${y}`);
    continue;
  }

  const heightNext = height + 1;
  for (const [dx, dy] of DIRS) {
    const xNext = x + dx;
    const yNext = y + dy;
    if (grid[yNext]?.[xNext] === heightNext) {
      q.push({ height: heightNext, start, x: xNext, y: yNext });
    }
  }
}
let sum = 0;
for (const peaks of trailheads.values()) {
  sum += peaks.size;
}
console.log(sum);
