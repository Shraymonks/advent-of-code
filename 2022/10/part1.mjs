import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

let X = 1;
let cycle = 0;
const logCycles = [20, 60, 100, 140, 180, 220];
let sum = 0;

for (const line of lines) {
  const [cmd, V] = line.split(' ');

  switch (cmd) {
    case 'noop':
      cycle++;
      break;
    case 'addx':
      cycle += 2;
      break;
  }
  if (logCycles.length > 0 && cycle >= logCycles[0]) {
    sum += logCycles.shift() * X;
  }

  X += Number(V) || 0;
}

console.log(sum);
