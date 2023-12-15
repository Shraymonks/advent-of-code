import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n');

const rotated = [];
for (let x = grid[0].length - 1; x >= 0; x--) {
  let row = '';
  for (let y = 0; y < grid.length; y++) {
    row += grid[y][x];
  }
  rotated.push(row);
}

const tilted = rotated.map((row) =>
  row.replaceAll(/[.O]*\.O[.O]*/g, (m) => {
    const numRocks = m.match(/O/g).length;
    return 'O'.repeat(numRocks) + '.'.repeat(m.length - numRocks);
  })
);

let load = 0;
for (const row of tilted) {
  for (let x = 0; x < row.length; x++) {
    if (row[x] === 'O') {
      load += row.length - x;
    }
  }
}
console.log(load);
