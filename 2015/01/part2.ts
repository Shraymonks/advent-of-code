import { getInput } from '../utils.js';

const input = await getInput();
let floor = 0;

for (let i = 0; i < input.length; i++) {
  const dir = input[i];
  switch (dir) {
    case '(':
      floor++;
      break;
    case ')':
      floor--;
      break;
  }

  if (floor === -1) {
    console.log(i + 1);
    break;
  }
}
