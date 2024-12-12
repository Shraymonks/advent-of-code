import { getInput } from '../utils.mjs';

const DIRS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const input = await getInput();
const grid = input.split('\n');

const rows = grid.length;
const cols = grid[0].length;

const regions = new Map();
const q = [];

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    q.push({ region: { perimeter: 0, spaces: 0 }, x, y });
  }
}

while (q.length > 0) {
  const { region, x, y } = q.pop();
  const type = grid[y][x];
  const key = `${x},${y}`;
  if (regions.has(key)) {
    continue;
  }
  regions.set(key, region);

  for (const [dx, dy] of DIRS) {
    if (grid[x + dx]?.[y + dy] !== type) {
      region.perimeter++;
    }
  }
  region.spaces++;

  for (const [dx, dy] of DIRS) {
    const xNext = x + dx;
    const yNext = y + dy;
    if (grid[yNext]?.[xNext] === type) {
      q.push({ region, x: xNext, y: yNext });
    }
  }
}

const uniqueRegions = new Set(regions.values());
let price = 0;
for (const { perimeter, spaces } of uniqueRegions) {
  price += perimeter * spaces;
}
console.log(price);
