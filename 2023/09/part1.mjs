import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

let total = 0;
for (const line of lines) {
  const history = line.split(' ').map(Number);
  const sequences = [history];
  let current = history;
  while (current.some((n) => n !== 0)) {
    const sequence = [];
    for (let i = 1; i < current.length; i++) {
      sequence.push(current[i] - current[i - 1]);
    }
    sequences.push(sequence);
    current = sequence;
  }
  for (const sequence of sequences) {
    total += sequence.at(-1);
  }
}

console.log(total);
