import { getInput } from '../utils.mjs';

const input = await getInput();
const [boardInput, path] = input.split('\n\n');
const rowsInput = boardInput.split('\n');

const rows = [];
const cols = [];

for (const rowInput of rowsInput) {
  const row = [];
  for (let x = 0; x < rowInput.length; x++) {
    if (rowInput[x] === ' ') {
      continue;
    }
    row.push({
      index: x,
      type: rowInput[x],
    });
  }
  rows.push(row);
}

for (let x = 0; x < rowsInput[0].length; x++) {
  const col = [];
  for (let y = 0; y < rowsInput.length; y++) {
    if (rowsInput[y][x] === ' ' || !rowsInput[y][x]) {
      continue;
    }
    col.push({
      index: y,
      type: rowsInput[y][x],
    });
  }
  cols.push(col);
}

let x = rows[0][0].index;
let y = 0;
let dir = 0;

function turn(clockwise) {
  dir = (dir + (clockwise ? 1 : -1) + 4) % 4;
}

function nextTile() {
  const col = cols[x];
  const row = rows[y];
  switch (dir) {
    case 0: {
      const start = row[0].index;
      const rowIndex = x - start;
      return row[(rowIndex + 1) % row.length];
    }
    case 1: {
      const start = col[0].index;
      const colIndex = y - start;
      return col[(colIndex + 1) % col.length];
    }
    case 2: {
      const start = row[0].index;
      const rowIndex = x - start;
      return row[(rowIndex - 1 + row.length) % row.length];
    }
    case 3: {
      const start = col[0].index;
      const colIndex = y - start;
      return col[(colIndex - 1 + col.length) % col.length];
    }
  }
}

let remainingPath = path;
while (remainingPath.length > 0) {
  switch (remainingPath[0]) {
    case 'R':
      turn(true);
      remainingPath = remainingPath.slice(1);
      break;
    case 'L':
      turn(false);
      remainingPath = remainingPath.slice(1);
      break;
    default:
      const moves = parseInt(remainingPath, 10);
      remainingPath = remainingPath.slice(moves.toString().length);

      for (let i = 0; i < moves; i++) {
        const next = nextTile();
        if (next.type === '#') {
          break;
        }
        if (dir % 2 === 0) {
          x = next.index;
        } else {
          y = next.index;
        }
      }
  }
}

console.log((y + 1) * 1000 + (x + 1) * 4 + dir);
