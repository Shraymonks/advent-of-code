import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n');

const yMax = grid.length;
const xMax = grid[0].length;

const nodes = new Map();
const antinodes = new Set();

for (let y = 0; y < yMax; y++) {
  for (let x = 0; x < xMax; x++) {
    const space = grid[y][x];
    if (space !== '.') {
      if (!nodes.has(space)) {
        nodes.set(space, []);
      }
      nodes.get(space).push([x, y]);
    }
  }
}

for (const positions of nodes.values()) {
  for (let i = 0; i < positions.length; i++) {
    const [xA, yA] = positions[i];
    for (let j = i + 1; j < positions.length; j++) {
      const [xB, yB] = positions[j];
      const xDiff = xA - xB;
      const yDiff = yA - yB;

      const x1 = xA + xDiff;
      const y1 = yA + yDiff;
      if (x1 >= 0 && x1 < xMax && y1 >= 0 && y1 < yMax) {
        antinodes.add(`${x1},${y1}`);
      }

      const x2 = xB - xDiff;
      const y2 = yB - yDiff;
      if (x2 >= 0 && x2 < xMax && y2 >= 0 && y2 < yMax) {
        antinodes.add(`${x2},${y2}`);
      }
    }
  }
}
console.log(antinodes.size);
