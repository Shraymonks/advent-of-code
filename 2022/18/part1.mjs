import { getInput } from '../utils.mjs';

const input = await getInput();
const cubes = new Set(input.split('\n'));

let surfaceArea = 0;
for (const cube of cubes) {
  const coords = cube.split(',');

  for (let i = 0; i < coords.length; i++) {
    const pre = coords.slice(0, i);
    const post = coords.slice(i + 1);
    for (const side of [-1, 1]) {
      if (!cubes.has([...pre, Number(coords[i]) + side, ...post].toString())) {
        surfaceArea++;
      }
    }
  }
}

console.log(surfaceArea);
