import { getInput } from '../utils.mjs';

const MOVES = {
  '^': [0, -1],
  '>': [1, 0],
  v: [0, 1],
  '<': [-1, 0],
};

const input = await getInput();
const [warehouse, movements] = input.split('\n\n');

const grid = warehouse.split('\n').map((row) => row.split(''));
let y = grid.findIndex((row) => row.includes('@'));
let x = grid[y].indexOf('@');

function attemptMove(dir, x, y) {
  const [dx, dy] = MOVES[dir];
  const nextX = x + dx;
  const nextY = y + dy;
  const nextSpace = grid[nextY][nextX];
  if (nextSpace === '#') {
    return false;
  }
  if (nextSpace === '.' || attemptMove(dir, nextX, nextY)) {
    grid[nextY][nextX] = grid[y][x];
    grid[y][x] = '.';
    return true;
  }
  return false;
}

for (const move of movements.replaceAll('\n', '')) {
  if (attemptMove(move, x, y)) {
    const [dx, dy] = MOVES[move];
    x += dx;
    y += dy;
  }
}

let sum = 0;
for (const [y, row] of grid.entries()) {
  for (const [x, cell] of row.entries()) {
    if (cell === 'O') {
      sum += 100 * y + x;
    }
  }
}
console.log(sum);
