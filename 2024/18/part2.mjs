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

for (const [x, y] of bytes) {
  grid[y][x] = '#';
}

function hasPath(byteX, byteY) {
  const q = [{ x: byteX, y: byteY }];
  while (q.length > 0) {
    const { x, y } = q.shift();
    if (seen[y][x]) {
      continue;
    }
    seen[y][x] = true;

    if (x === SIZE && y === SIZE) {
      return [byteX, byteY];
    }

    for (const [dx, dy] of MOVES) {
      const nextX = x + dx;
      const nextY = y + dy;
      if (grid[nextY]?.[nextX] === '.') {
        q.push({
          x: nextX,
          y: nextY,
        });
      }
    }
  }
  return false;
}

let coords = hasPath(0, 0);

for (let i = bytes.length - 1; i >= 0 && !coords; i--) {
  const [x, y] = bytes[i];
  grid[y][x] = '.';

  for (const [dx, dy] of MOVES) {
    if (seen[y + dy]?.[x + dx]) {
      coords = hasPath(x, y);
      break;
    }
  }
}
console.log(coords.join(','));
