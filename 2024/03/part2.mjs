import { getInput } from '../utils.mjs';

const input = await getInput();

const instructions = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);

let sum = 0;
let enable = true;
for (const [instruction, x, y] of instructions) {
  switch (instruction) {
    case 'do()':
      enable = true;
      break;
    case "don't()":
      enable = false;
      break;
    default:
      if (enable) {
        sum += Number(x) * Number(y);
      }
  }
}
console.log(sum);
