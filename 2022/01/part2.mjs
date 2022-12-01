import { getInput } from '../utils.mjs';

const input = await getInput();
const inventories = input.split('\n\n');
const caloriesList = [];

for (const inventory of inventories) {
  let sum = 0;
  for (const n of inventory.split('\n')) {
    sum += Number(n);
  }

  caloriesList.push(sum);
}
caloriesList.sort((a, b) => b - a);

let total = 0;
const top3 = caloriesList.slice(0, 3);

for (const calories of top3) {
  total += calories;
}

console.log(total);
