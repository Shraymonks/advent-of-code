import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n');

const POSSIBLE_MOVES = new Map([
  [
    'S',
    [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ],
  ],
  [
    '-',
    [
      [1, 0],
      [-1, 0],
    ],
  ],
  [
    '|',
    [
      [0, 1],
      [0, -1],
    ],
  ],
  [
    'L',
    [
      [1, 0],
      [0, -1],
    ],
  ],
  [
    'J',
    [
      [-1, 0],
      [0, -1],
    ],
  ],
  [
    '7',
    [
      [-1, 0],
      [0, 1],
    ],
  ],
  [
    'F',
    [
      [1, 0],
      [0, 1],
    ],
  ],
]);

const CONNECTING_PIPES = new Map([
  ['0,1', new Set('|LJ')],
  ['1,0', new Set('-J7')],
  ['0,-1', new Set('|7F')],
  ['-1,0', new Set('-LF')],
]);

const yStart = grid.findIndex((row) => row.includes('S'));
const xStart = grid[yStart].indexOf('S');
const loopTiles = new Set([`${xStart},${yStart}`]);

const q = [
  {
    x: xStart,
    y: yStart,
  },
];

while (q.length > 0) {
  const { x, y } = q.pop();

  for (const [dx, dy] of POSSIBLE_MOVES.get(grid[y][x])) {
    const newX = x + dx;
    const newY = y + dy;
    const key = `${newX},${newY}`;

    if (
      CONNECTING_PIPES.get(`${dx},${dy}`).has(grid[newY]?.[newX]) &&
      !loopTiles.has(key)
    ) {
      q.push({
        x: newX,
        y: newY,
      });
      loopTiles.add(key);
      break;
    }
  }
}
console.log(loopTiles.size / 2);
