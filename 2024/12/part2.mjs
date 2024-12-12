import { getInput } from '../utils.mjs';

const DIRS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const CORNERS = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];

const input = await getInput();
const grid = input.split('\n');

const rows = grid.length;
const cols = grid[0].length;

const regions = new Map();
const q = [];

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    q.push({ region: { sides: 0, spaces: 0 }, x, y });
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

  for (const [dx, dy] of CORNERS) {
    const corner = grid[y + dy]?.[x + dx];
    const side1 = grid[y]?.[x + dx];
    const side2 = grid[y + dy]?.[x];
    if (
      (side1 === type && side2 === type && type !== corner) ||
      (side1 !== type && side2 !== type)
    ) {
      region.sides++;
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
for (const { sides, spaces } of uniqueRegions) {
  price += sides * spaces;
}
console.log(price);
