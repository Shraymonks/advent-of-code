import { getInput } from '../utils.mjs';

const input = await getInput();
const [instructions, network] = input.split('\n\n');

const nodeBranches = new Map();
const lines = network.split('\n');
for (const line of lines) {
  const [, node, L, R] = line.match(/(.+) = \((.+), (.+)\)/);
  nodeBranches.set(node, { L, R });
}

let node = 'AAA';
let steps = 0;
while (node !== 'ZZZ') {
  const dir = instructions[steps % instructions.length];
  node = nodeBranches.get(node)[dir];
  steps++;
}
console.log(steps);
