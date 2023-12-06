import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const [times, distances] = lines.map((line) => {
  const [, list] = line.split(/:\s+/);
  return [Number(list.replace(/\s+/g, ''))];
});

let total = 1;
for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = distances[i];
  let count = 0;

  for (let i = 1; i < time; i++) {
    if ((time - i) * i > distance) {
      count++;
    }
  }
  total *= count;
}

console.log(total);
