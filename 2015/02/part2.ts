import { getInput } from '../utils.js';

const input = await getInput();
const dimensions = input.split('\n');

let totalRibbon = 0;

for (const dim of dimensions) {
  const [l, w, h] = dim.split('x').map(Number) as [number, number, number];

  const minPerimeter = (l + w + h - Math.max(l, w, h)) * 2;
  const volume = l * w * h;
  totalRibbon += minPerimeter + volume;
}

console.log(totalRibbon);
