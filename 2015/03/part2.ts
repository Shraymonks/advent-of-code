import { getInput } from '../utils.js';

const input = await getInput();

type Bit = 0 | 1;
interface Coord {
  x: number;
  y: number;
}

const positions: [Coord, Coord] = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];
const visited = new Set(['0,0']);
let current: Bit = 0;

for (const dir of input) {
  const santa = positions[current];
  switch (dir) {
    case '>':
      santa.x++;
      break;
    case 'v':
      santa.y++;
      break;
    case '<':
      santa.x--;
      break;
    case '^':
      santa.y--;
      break;
  }
  visited.add(`${santa.x},${santa.y}`);
  current = current === 0 ? 1 : 0;
}

console.log(visited.size);
