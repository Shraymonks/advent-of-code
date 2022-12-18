import { getInput } from '../utils.mjs';

const input = await getInput();
const cubes = new Set(input.split('\n'));

const seen = new Set();
const bounds = [
  [Infinity, -Infinity],
  [Infinity, -Infinity],
  [Infinity, -Infinity],
];
let surfaceArea = 0;
for (const cube of cubes) {
  const coords = cube.split(',').map(Number);
  for (let i = 0; i < coords.length; i++) {
    bounds[i][0] = Math.min(bounds[i][0], coords[i] - 1);
    bounds[i][1] = Math.max(bounds[i][1], coords[i] + 1);
  }
}

const q = [bounds.map(([min]) => min)];

while (q.length > 0) {
  const coords = q.shift();

  const key = coords.toString();
  if (seen.has(key)) {
    continue;
  } else {
    seen.add(key);
  }

  for (let i = 0; i < coords.length; i++) {
    const pre = coords.slice(0, i);
    const post = coords.slice(i + 1);
    for (const side of [-1, 1]) {
      const c = [...pre, coords[i] + side, ...post];

      if (cubes.has(c.toString())) {
        surfaceArea++;
      } else if (
        [0, 1, 2].every((j) => c[j] >= bounds[j][0] && c[j] <= bounds[j][1])
      ) {
        q.push(c);
      }
    }
  }
}

console.log(surfaceArea);
