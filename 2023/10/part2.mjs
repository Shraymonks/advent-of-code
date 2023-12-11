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

const BLOCKED_HORIZONTAL = new Set([
  '||',
  '7|',
  '7J',
  '7L',
  'F|',
  'FL',
  'FJ',
  '|L',
  '|J',
  'S|',
  '|S',
  '7S',
  'FS',
  'SL',
  'SJ',
]);
const BLOCKED_VERTICAL = new Set([
  '--',
  '-J',
  '-7',
  'LJ',
  'L-',
  'L7',
  'F7',
  'F-',
  'FJ',
  'S-',
  '-S',
  'SJ',
  'S7',
  'LS',
  'FS',
]);

const visited = new Set([`${xStart},${yStart}`]);

function getQuadrants(x, y) {
  return [
    [x + 1, y],
    [x, y],
    [x, y + 1],
    [x + 1, y + 1],
  ];
}

const q2 = [
  {
    x: xStart,
    y: yStart,
  },
];

let enclosed = 0;
while (q2.length > 0) {
  const { x, y } = q2.pop();

  const quadrants = getQuadrants(x, y);
  const moves = [
    {
      border: [quadrants[1], quadrants[2]],
      move: [-1, 0],
    },
    {
      border: [quadrants[0], quadrants[3]],
      move: [1, 0],
    },
    {
      border: [quadrants[1], quadrants[0]],
      move: [0, -1],
    },
    {
      border: [quadrants[2], quadrants[3]],
      move: [0, 1],
    },
  ];

  for (const {
    border,
    move: [dx, dy],
  } of moves) {
    const borderTiles =
      grid[border[0][1]][border[0][0]] + grid[border[1][1]][border[1][0]];
    const blocked = dx === 0 ? BLOCKED_VERTICAL : BLOCKED_HORIZONTAL;
    const newX = x + dx;
    const newY = y + dy;
    const key = `${newX},${newY}`;

    if (
      newX >= 0 &&
      newX < grid[0].length - 1 &&
      newY >= 0 &&
      newY < grid.length - 1 &&
      !blocked.has(borderTiles) &&
      !visited.has(key)
    ) {
      q2.push({
        x: newX,
        y: newY,
      });
      visited.add(key);
      if (!loopTiles.has(key)) {
        enclosed++;
      }
    }
  }
}

console.log(enclosed);
