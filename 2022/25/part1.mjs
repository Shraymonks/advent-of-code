import { getInput } from '../utils.mjs';

const input = await getInput();
const numbers = input.split('\n');

const DIGITS = new Map([
  ['=', -2],
  ['-', -1],
  ['0', 0],
  ['1', 1],
  ['2', 2],
]);

const REPLACEMENT = new Map([
  ['3', '='],
  ['4', '-'],
]);

let sum = 0;
for (const number of numbers) {
  for (let i = 0; i < number.length; i++) {
    sum += Math.pow(5, number.length - i - 1) * DIGITS.get(number[i]);
  }
}

let snafu = sum.toString(5);
for (let i = snafu.length - 1; i >= 0; i--) {
  if (REPLACEMENT.has(snafu[i])) {
    snafu =
      (i === 0 ? '1' : (parseInt(snafu.slice(0, i), 5) + 1).toString(5)) +
      REPLACEMENT.get(snafu[i]) +
      snafu.slice(i + 1);
  }
}
console.log(snafu);
