import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n');

function getNewBeams({ dx, dy, tile }) {
  switch (tile) {
    case '|':
      if (dx !== 0) {
        return [
          [0, -1],
          [0, 1],
        ];
      }
      break;
    case '-':
      if (dy !== 0) {
        return [
          [-1, 0],
          [1, 0],
        ];
      }
      break;
    case '/':
      return [[-dy, -dx]];
    case '\\':
      return [[dy, dx]];
  }
  return [[dx, dy]];
}

function getEnergized({ dx, dy, x, y }) {
  const energizedTiles = new Set();
  const visited = new Set();

  const q = [{ dx, dy, x, y }];
  while (q.length > 0) {
    const { dx, dy, x, y } = q.pop();

    const key = `${dx},${dy},${x},${y}`;
    if (visited.has(key)) {
      continue;
    }
    energizedTiles.add(`${x},${y}`);
    visited.add(key);

    const newBeams = getNewBeams({ dx, dy, tile: grid[y][x] });
    for (const [newDx, newDy] of newBeams) {
      const newX = x + newDx;
      const newY = y + newDy;
      const newTile = grid[newY]?.[newX];
      if (newTile) {
        q.push({
          dx: newDx,
          dy: newDy,
          x: newX,
          y: newY,
        });
      }
    }
  }
  return energizedTiles.size;
}

let max = 0;
for (let x = 0; x < grid[0].length; x++) {
  max = Math.max(
    max,
    getEnergized({ dx: 0, dy: 1, x, y: 0 }),
    getEnergized({ dx: 0, dy: -1, x, y: grid.length - 1 })
  );
}
for (let y = 0; y < grid.length; y++) {
  max = Math.max(
    max,
    getEnergized({ dx: 1, dy: 0, x: 0, y }),
    getEnergized({ dx: -1, dy: 0, x: grid[0].length - 1, y })
  );
}
console.log(max);
