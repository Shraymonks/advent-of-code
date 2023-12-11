import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n');

const emptyCols = new Set([...grid[0]].keys());
const emptyRows = new Set(grid.keys());
const galaxies = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === '#') {
      galaxies.push([x, y]);
      emptyCols.delete(x);
      emptyRows.delete(y);
    }
  }
}

const emptyColsList = [...emptyCols];
const emptyRowsList = [...emptyRows];

let sum = 0;
for (let i = 0; i < galaxies.length; i++) {
  const [x1, y1] = galaxies[i];
  for (let j = i + 1; j < galaxies.length; j++) {
    const [x2, y2] = galaxies[j];
    const xMax = Math.max(x1, x2);
    const xMin = Math.min(x1, x2);
    const yMax = Math.max(y1, y2);
    const yMin = Math.min(y1, y2);

    const numEmptyCols = emptyColsList.filter(
      (x) => xMin < x && x < xMax
    ).length;
    const numEmptyRows = emptyRowsList.filter(
      (y) => yMin < y && y < yMax
    ).length;

    sum += xMax - xMin + yMax - yMin + (numEmptyCols + numEmptyRows) * 999999;
  }
}

console.log(sum);
