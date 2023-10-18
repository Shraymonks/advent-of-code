import { getInput } from '../utils.js';

const input = await getInput();
let floor = 0;

for (const dir of input) {
  switch (dir) {
    case '(':
      floor++;
      break;
    case ')':
      floor--;
      break;
  }
}

console.log(floor);
