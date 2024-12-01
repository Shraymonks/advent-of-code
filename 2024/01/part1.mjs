import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const leftList = [];
const rightList = [];

for (const line of lines) {
  const [left, right] = line.split(/\s+/).map(Number);
  leftList.push(left);
  rightList.push(right);
}

const leftSorted = leftList.toSorted((a, b) => a - b);
const rightSorted = rightList.toSorted((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < leftSorted.length; i++) {
  totalDistance += Math.abs(leftSorted[i] - rightSorted[i]);
}

console.log(totalDistance);
