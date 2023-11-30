import { getInput } from '../utils.js';

const input = await getInput();
const containers = input.split('\n').map(Number);

let count = 0;
let minContainers = Infinity;

const combinations = 2 ** containers.length - 1;
for (let i = 0; i <= combinations; i++) {
  let sum = 0;
  let n = i;
  let index = 0;
  let numContainers = 0;
  while (n > 0) {
    if (n & 1) {
      numContainers++;
      sum += containers[index]!;
    }
    n >>= 1;
    index++;
  }
  if (sum === 150) {
    if (numContainers < minContainers) {
      minContainers = numContainers;
      count = 1;
    } else if (numContainers === minContainers) {
      count++;
    }
  }
}

console.log(count);
