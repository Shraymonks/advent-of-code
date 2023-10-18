import { getInput } from '../utils.js';

const input = await getInput();
const dimensions = input.split('\n');

let totalPaper = 0;

for (const dim of dimensions) {
  const [l, w, h] = dim.split('x').map(Number) as [number, number, number];

  const surfaceArea = (l * w + w * h + h * l) * 2;
  const smallestArea = (l * w * h) / Math.max(l, w, h);
  totalPaper += surfaceArea + smallestArea;
}

console.log(totalPaper);
