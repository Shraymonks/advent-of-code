import { getInput } from '../utils.mjs';

const input = await getInput();
const [registersInput, programInput] = input.split('\n\n');

let [, bStart, cStart] = registersInput.matchAll(/\d+/g).map(BigInt);
const programText = programInput.slice(programInput.indexOf(' ') + 1);
const program = programText.split(',').map(Number);

function runProgram(a) {
  let b = bStart;
  let c = cStart;
  let pointer = 0;

  function combo(operand) {
    switch (operand) {
      case 0n:
      case 1n:
      case 2n:
      case 3n:
        return operand;
      case 4n:
        return a;
      case 5n:
        return b;
      case 6n:
        return c;
    }
  }

  const output = [];

  while (pointer < program.length) {
    const instruction = program[pointer];
    const operand = BigInt(program[pointer + 1]);

    switch (instruction) {
      case 0:
        a = a / 2n ** combo(operand);
        break;
      case 1:
        b ^= operand;
        break;
      case 2:
        b = combo(operand) % 8n;
        break;
      case 3:
        if (a !== 0n) {
          pointer = Number(operand);
          continue;
        }
        break;
      case 4:
        b ^= c;
        break;
      case 5:
        output.push(combo(operand) % 8n);
        break;
      case 6:
        b = a / 2n ** combo(operand);
        break;
      case 7:
        c = a / 2n ** combo(operand);
        break;
    }
    pointer += 2;
  }
  return output.join(',');
}

const q = [0n];
while (q.length > 0) {
  const n = q.shift();
  const output = runProgram(n);
  if (programText === output) {
    console.log(n.toString());
    break;
  }
  if (programText.endsWith(output)) {
    for (let i = 0n; i < 8n; i++) {
      q.push(n * 8n + i);
    }
  }
}
