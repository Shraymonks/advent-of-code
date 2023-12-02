import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const bag = new Map([
  ['red', 12],
  ['green', 13],
  ['blue', 14],
]);

let sum = 0;
l: for (const line of lines) {
  const [gameString, sets] = line.split(': ');
  const id = Number(gameString.split(' ')[1]);

  for (const set of sets.split('; ')) {
    for (const pull of set.split(', ')) {
      const [count, color] = pull.split(' ');
      if (bag.get(color) < Number(count)) {
        continue l;
      }
    }
  }

  sum += id;
}

console.log(sum);
