import { getInput } from '../utils.mjs';

const input = await getInput();
const [registersInput, programInput] = input.split('\n\n');

let [a, b, c] = registersInput.matchAll(/\d+/g).map(Number);
const program = programInput
  .slice(programInput.indexOf(' ') + 1)
  .split(',')
  .map(Number);

let pointer = 0;

function combo(operand) {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return a;
    case 5:
      return b;
    case 6:
      return c;
  }
}

const output = [];

while (pointer < program.length) {
  const instruction = program[pointer];
  const operand = program[pointer + 1];

  switch (instruction) {
    case 0:
      a = Math.trunc(a / 2 ** combo(operand));
      break;
    case 1:
      b ^= operand;
      break;
    case 2:
      b = combo(operand) % 8;
      break;
    case 3:
      if (a !== 0) {
        pointer = operand;
        continue;
      }
      break;
    case 4:
      b ^= c;
      break;
    case 5:
      output.push(combo(operand) % 8);
      break;
    case 6:
      b = Math.trunc(a / 2 ** combo(operand));
      break;
    case 7:
      c = Math.trunc(a / 2 ** combo(operand));
      break;
  }
  pointer += 2;
}
console.log(output.join(','));
