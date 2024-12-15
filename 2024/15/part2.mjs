import { getInput } from '../utils.mjs';

const MOVES = {
  '^': [0, -1],
  '>': [1, 0],
  v: [0, 1],
  '<': [-1, 0],
};

const input = await getInput();
const [warehouse, movements] = input.split('\n\n');

const grid = warehouse
  .replaceAll(/./g, (c) => {
    switch (c) {
      case '#':
        return '##';
      case 'O':
        return '[]';
      case '.':
        return '..';
      default:
        return '@.';
    }
  })
  .split('\n')
  .map((row) => row.split(''));
let y = grid.findIndex((row) => row.includes('@'));
let x = grid[y].indexOf('@');

function isMovePossible(dir, x, y) {
  const [dx, dy] = MOVES[dir];
  const nextX = x + dx;
  const nextY = y + dy;
  const nextSpace = grid[nextY][nextX];
  return (
    nextSpace === '.' ||
    (nextSpace !== '#' &&
      isMovePossible(dir, nextX, nextY) &&
      (dir === '<' ||
        dir === '>' ||
        isMovePossible(dir, nextX + (nextSpace === '[' ? 1 : -1), nextY)))
  );
}

function makeMove(dir, x, y) {
  const [dx, dy] = MOVES[dir];
  const nextX = x + dx;
  const nextY = y + dy;
  const nextSpace = grid[nextY][nextX];
  switch (nextSpace) {
    case '#':
      return;
    case '[':
    case ']':
      makeMove(dir, nextX, nextY);
      if (dir === '^' || dir === 'v') {
        makeMove(dir, nextX + (nextSpace === '[' ? 1 : -1), nextY);
      }
      break;
  }
  grid[nextY][nextX] = grid[y][x];
  grid[y][x] = '.';
}

for (const move of movements.replaceAll('\n', '')) {
  if (isMovePossible(move, x, y)) {
    makeMove(move, x, y);
    const [dx, dy] = MOVES[move];
    x += dx;
    y += dy;
  }
}

let sum = 0;
for (const [y, row] of grid.entries()) {
  for (const [x, cell] of row.entries()) {
    if (cell === '[') {
      sum += 100 * y + x;
    }
  }
}
console.log(sum);
