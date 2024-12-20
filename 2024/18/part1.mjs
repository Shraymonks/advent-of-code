import { getInput } from '../utils.mjs';

const SIZE = 70;

const MOVES = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const input = await getInput();
const lines = input.split('\n');
const bytes = lines.map((line) => line.split(',').map(Number));

const grid = [];
const seen = [];

for (let y = 0; y <= SIZE; y++) {
  const row = [];
  const seenRow = [];
  for (let x = 0; x <= SIZE; x++) {
    row.push('.');
    seenRow.push(false);
  }
  grid.push(row);
  seen.push(seenRow);
}

for (let i = 0; i < 1024; i++) {
  const [x, y] = bytes[i];
  grid[y][x] = '#';
}

const q = [{ steps: 0, x: 0, y: 0 }];

while (q.length > 0) {
  const { steps, x, y } = q.shift();
  if (seen[y][x]) {
    continue;
  }
  seen[y][x] = true;

  if (x === SIZE && y === SIZE) {
    console.log(steps);
    break;
  }

  for (const [dx, dy] of MOVES) {
    const nextX = x + dx;
    const nextY = y + dy;
    if (grid[nextY]?.[nextX] === '.') {
      q.push({
        steps: steps + 1,
        x: nextX,
        y: nextY,
      });
    }
  }
}
