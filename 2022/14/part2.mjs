import { getInput } from '../utils.mjs';

const input = await getInput();
const paths = input.split('\n');

let floor = -Infinity;

const SAND_START = [500, 0];
const filled = new Set();

for (const path of paths) {
  const points = path.split(' -> ');
  let prev = [];
  for (const point of points) {
    const [x, y] = point.split(',').map(Number);
    if (prev.length === 0) {
      filled.add(`${x},${y}`);
    } else if (prev[0] === x) {
      const min = Math.min(prev[1], y);
      const max = Math.max(prev[1], y);
      for (let y2 = min; y2 <= max; y2++) {
        filled.add(`${x},${y2}`);
      }
    } else if (prev[1] === y) {
      const min = Math.min(prev[0], x);
      const max = Math.max(prev[0], x);
      for (let x2 = min; x2 <= max; x2++) {
        filled.add(`${x2},${y}`);
      }
    }
    prev = [x, y];
    floor = Math.max(floor, y);
  }
}
floor += 2;

function sandFalls() {
  let [x, y] = SAND_START;
  while (y + 1 < floor) {
    if (!filled.has(`${x},${y + 1}`)) {
      y++;
    } else if (!filled.has(`${x - 1},${y + 1}`)) {
      x--;
      y++;
    } else if (!filled.has(`${x + 1},${y + 1}`)) {
      x++;
      y++;
    } else {
      break;
    }
  }
  if (!filled.has(`${x},${y}`)) {
    return filled.add(`${x},${y}`);
  }
}

let units = 0;
while (sandFalls()) {
  units++;
}

console.log(units);
