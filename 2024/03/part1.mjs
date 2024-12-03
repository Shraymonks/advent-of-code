import { getInput } from '../utils.mjs';

const input = await getInput();

const muls = input.matchAll(/mul\((\d+),(\d+)\)/g);

let sum = 0;
for (const [, x, y] of muls) {
  sum += Number(x) * Number(y);
}
console.log(sum);
