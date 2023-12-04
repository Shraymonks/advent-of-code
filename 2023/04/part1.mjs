import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

let total = 0;
for (const line of lines) {
  const [, numbers] = line.split(/:\s+/);
  const [winning, yours] = numbers
    .split(/\s+\|\s+/)
    .map((nums) => nums.split(/\s+/).map(Number));
  const winningSet = new Set(winning);

  const numMatches = yours.filter((n) => winningSet.has(n)).length;
  total += numMatches && 2 ** (numMatches - 1);
}

console.log(total);
