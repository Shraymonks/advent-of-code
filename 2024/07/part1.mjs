import { getInput } from '../utils.mjs';

const input = await getInput();
const equations = input.split('\n');

function isPossible(testValue, nums, i = nums.length - 1) {
  const n = nums[i];
  if (i === 0) {
    return n === testValue;
  }

  const iNext = i - 1;
  if (testValue % n === 0 && isPossible(testValue / n, nums, iNext)) {
    return true;
  }

  return isPossible(testValue - n, nums, iNext);
}

let sum = 0;
for (const equation of equations) {
  const [left, right] = equation.split(': ');

  const testValue = Number(left);
  const nums = right.split(' ').map(Number);

  if (isPossible(testValue, nums)) {
    sum += testValue;
  }
}
console.log(sum);
