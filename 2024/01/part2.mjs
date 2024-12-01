import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const leftList = [];
const rightFrequency = new Map();

for (const line of lines) {
  const [left, right] = line.split(/\s+/).map(Number);
  leftList.push(left);
  rightFrequency.set(right, (rightFrequency.get(right) ?? 0) + 1);
}

let totalSimilarityScore = 0;
for (const n of leftList) {
  totalSimilarityScore += n * (rightFrequency.get(n) ?? 0);
}

console.log(totalSimilarityScore);
