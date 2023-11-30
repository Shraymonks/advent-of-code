import { getInput } from '../utils.js';

const input = await getInput();
const containers = input.split('\n').map(Number);

let count = 0;

const combinations = 2 ** containers.length - 1;
for (let i = 0; i <= combinations; i++) {
  let sum = 0;
  let n = i;
  let index = 0;
  while (n > 0) {
    if (n & 1) {
      sum += containers[index]!;
    }
    n >>= 1;
    index++;
  }
  if (sum === 150) {
    count++;
  }
}

console.log(count);
