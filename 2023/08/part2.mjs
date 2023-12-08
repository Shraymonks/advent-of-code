import { getInput } from '../utils.mjs';

const input = await getInput();
const [instructions, network] = input.split('\n\n');

const nodeBranches = new Map();
const lines = network.split('\n');
for (const line of lines) {
  const [, node, L, R] = line.match(/(.+) = \((.+), (.+)\)/);
  nodeBranches.set(node, { L, R });
}

let totalSteps = instructions.length;
for (let [node] of nodeBranches) {
  if (node.slice(-1) !== 'A') {
    continue;
  }
  let steps = 0;
  while (node.slice(-1) !== 'Z') {
    const dir = instructions[steps % instructions.length];
    node = nodeBranches.get(node)[dir];
    steps++;
  }
  totalSteps *= steps / instructions.length;
}
console.log(totalSteps);
