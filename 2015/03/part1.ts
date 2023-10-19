import { getInput } from '../utils.js';

const input = await getInput();

let x = 0;
let y = 0;
const visited = new Set(['0,0']);

for (const dir of input) {
  switch (dir) {
    case '>':
      x++;
      break;
    case 'v':
      y++;
      break;
    case '<':
      x--;
      break;
    case '^':
      y--;
      break;
  }
  visited.add(`${x},${y}`);
}

console.log(visited.size);
