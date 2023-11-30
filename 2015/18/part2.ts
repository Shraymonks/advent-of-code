import { getInput } from '../utils.js';

const input = await getInput();
const rows = input.split('\n');
let grid = rows.map((row) => row.split(''));

function turnOnCorners(grid: string[][]) {
  const corners = [
    [0, 0],
    [0, grid.length - 1],
    [grid[0]!.length - 1, 0],
    [grid[0]!.length - 1, grid.length - 1],
  ];
  for (const [x, y] of corners) {
    grid[y!]![x!] = '#';
  }
}

turnOnCorners(grid);

for (let step = 0; step < 100; step++) {
  const newGrid = [];

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]!;
    const newRow = [];
    for (let x = 0; x < row.length; x++) {
      const isOn = row[x] === '#';
      let neighborsOn = 0;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (grid[y + dy]?.[x + dx] === '#' && !(dx === 0 && dy === 0)) {
            neighborsOn++;
          }
        }
      }
      newRow.push(
        isOn
          ? neighborsOn === 2 || neighborsOn === 3
            ? '#'
            : '.'
          : neighborsOn === 3
          ? '#'
          : '.'
      );
    }
    newGrid.push(newRow);
  }
  grid = newGrid;
  turnOnCorners(grid);
}

let numOn = 0;
for (let y = 0; y < grid.length; y++) {
  const row = grid[y]!;
  for (let x = 0; x < row.length; x++) {
    if (row[x] === '#') {
      numOn++;
    }
  }
}

console.log(numOn);
