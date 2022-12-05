import { getInput } from '../utils.mjs';

const input = await getInput();
const [crateInput, instructionsInput] = input.split('\n\n');

const crateRows = crateInput.split('\n');
const numStacks = crateRows.pop().trim().split(/\s+/).length;

const stacks = [];
for (let i = 0; i < numStacks; i++) {
  const stack = [];
  const colIndex = i * 4 + 1;
  for (let j = crateRows.length - 1; j >= 0; j--) {
    const crate = crateRows[j][colIndex];
    if (crate === ' ') {
      break;
    }
    stack.push(crate);
  }
  stacks.push(stack);
}

const instructions = instructionsInput.split('\n');
for (const instruction of instructions) {
  const [n, from, to] = instruction
    .replace('move ', '')
    .replace('from ', '')
    .replace('to ', '')
    .split(' ');

  stacks[to - 1].push(...stacks[from - 1].splice(-n));
}

console.log(stacks.map((stack) => stack.pop() ?? '').join(''));
