import { getInput } from '../utils.mjs';

const input = await getInput();
const inventories = input.split('\n\n');
let max = 0;

for (const inventory of inventories) {
  let sum = 0;
  for (const n of inventory.split('\n')) {
    sum += Number(n);
  }
  if (sum > max) {
    max = sum;
  }
}

console.log(max);
