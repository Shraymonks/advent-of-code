import { getInput } from '../utils.mjs';

const input = await getInput();
const rows = input.split('\n');

const elves = new Set();
for (let y = 0; y < rows.length; y++) {
  const row = rows[y];
  for (let x = 0; x < row.length; x++) {
    if (row[x] === '#') {
      elves.add(`${x},${y}`);
    }
  }
}

const bounds = [
  [Infinity, -Infinity],
  [Infinity, -Infinity],
];

const POTENTIAL_MOVES = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];
const ADJACENT = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
const ADJACENT_DIR = [-1, 0, 1];
let moveIndex = 0;

for (let round = 1; true; round++) {
  const moves = new Map();
  for (const elf of elves) {
    const [x, y] = elf.split(',').map(Number);
    if (
      !ADJACENT.some(([xDelta, yDelta]) =>
        elves.has(`${x + xDelta},${y + yDelta}`)
      )
    ) {
      continue;
    }
    for (let i = 0; i < POTENTIAL_MOVES.length; i++) {
      const [xDelta, yDelta] =
        POTENTIAL_MOVES[(moveIndex + i) % POTENTIAL_MOVES.length];
      if (
        ADJACENT_DIR.every(
          (delta) =>
            !elves.has(`${x + (xDelta || delta)},${y + (yDelta || delta)}`)
        )
      ) {
        const newMove = `${x + xDelta},${y + yDelta}`;
        if (moves.has(newMove)) {
          moves.delete(newMove);
        } else {
          moves.set(newMove, elf);
        }
        break;
      }
    }
  }
  if (moves.size === 0) {
    console.log(round);
    break;
  }
  for (const [newPos, oldPos] of moves) {
    elves.delete(oldPos);
    elves.add(newPos);
  }
  moveIndex = (moveIndex + 1) % POTENTIAL_MOVES.length;
}
for (const elf of elves) {
  const dim = elf.split(',').map(Number);
  for (let i = 0; i < dim.length; i++) {
    bounds[i][0] = Math.min(bounds[i][0], dim[i]);
    bounds[i][1] = Math.max(bounds[i][1], dim[i]);
  }
}
