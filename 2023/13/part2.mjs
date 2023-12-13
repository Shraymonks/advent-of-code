import { getInput } from '../utils.mjs';

const input = await getInput();
const patterns = input.split('\n\n');

function oneDiff(row1, row2) {
  let diffs = 0;
  for (const [i, c] of [...row1].entries()) {
    if (c !== row2[i]) {
      diffs++;
    }
  }
  return diffs;
}

function getSummary(grid) {
  l: for (let r1 = 0; r1 < grid.length - 1; r1++) {
    let fixed = false;
    const end = Math.min(r1, grid.length - 2 - r1) + 1;
    for (let r2 = 0; r2 < end; r2++) {
      const row = grid[r1 - r2];
      const row2 = grid[r1 + r2 + 1];
      if (row !== row2) {
        if (fixed) {
          continue l;
        }
        const diffs = oneDiff(row, row2);
        if (diffs !== 1) {
          continue l;
        }
        fixed = true;
      }
    }
    if (!fixed) {
      continue l;
    }
    return r1 + 1;
  }
  return 0;
}

let notes = 0;
for (const pattern of patterns) {
  const grid = pattern.split('\n');

  const cols = [];

  for (let x = 0; x < grid[0].length; x++) {
    let col = '';
    for (let y = 0; y < grid.length; y++) {
      col += grid[y][x];
    }
    cols.push(col);
  }

  notes += getSummary(grid) * 100;
  notes += getSummary(cols);
}

console.log(notes);
