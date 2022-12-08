import { getInput } from '../utils.mjs';

const input = await getInput();
const rows = input.split('\n').map((row) => row.split('').map(Number));

const cols = [];
for (let x = 0; x < rows[0].length; x++) {
  const col = [];
  for (let y = 0; y < rows.length; y++) {
    col.push(rows[y][x]);
  }
  cols.push(col);
}

const outerVisible = (rows.length + cols.length - 2) * 2;
const innerVisible = new Set();

function addVisibleLine(line, x, y) {
  let tallest = line[0];

  function addVisible(i) {
    const height = line[i];
    if (height > tallest) {
      innerVisible.add(`${x ?? i},${y ?? i}`);
      tallest = height;
    }
  }
  for (let i = 1; i < line.length - 1; i++) {
    addVisible(i);
  }
  tallest = line[line.length - 1];
  for (let i = line.length - 2; i > 0; i--) {
    addVisible(i);
  }
}

for (let y = 1; y < rows.length - 1; y++) {
  addVisibleLine(rows[y], null, y);
}

for (let x = 1; x < cols.length - 1; x++) {
  addVisibleLine(cols[x], x, null);
}

console.log(outerVisible + innerVisible.size);
