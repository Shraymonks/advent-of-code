import { getInput } from '../utils.mjs';

const input = await getInput();
const rows = input.split('\n').map((row) => [...row].map(Number));

const cols = [];
for (let x = 0; x < rows[0].length; x++) {
  const col = [];
  for (let y = 0; y < rows.length; y++) {
    col.push(rows[y][x]);
  }
  cols.push(col);
}

let maxScore = 0;
for (let y = 0; y < rows.length; y++) {
  const row = rows[y];
  for (let x = 0; x < row.length; x++) {
    const col = cols[x];
    const height = row[x];
    let score = 1;

    const lines = [
      row.slice(x + 1),
      row.slice(0, x).reverse(),
      col.slice(0, y).reverse(),
      col.slice(y + 1),
    ];

    for (const line of lines) {
      let treesVisible = 0;
      for (const tree of line) {
        treesVisible++;
        if (tree >= height) {
          break;
        }
      }
      score *= treesVisible;
    }
    if (score > maxScore) {
      maxScore = score;
    }
  }
}

console.log(maxScore);
