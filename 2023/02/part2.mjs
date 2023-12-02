import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

let sum = 0;
for (const line of lines) {
  const sets = line.split(': ')[1];
  const minRequired = new Map();

  for (const set of sets.split(': ')) {
    for (const pull of set.split(', ')) {
      const [count, color] = pull.split(' ');
      minRequired.set(
        color,
        Math.max(minRequired.get(color) ?? 0, Number(count))
      );
    }
  }

  let power = 1;
  for (const count of minRequired.values()) {
    power *= count;
  }
  sum += power;
}

console.log(sum);
