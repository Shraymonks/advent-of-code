import { getInput } from '../utils.js';

const input = await getInput();
const lines = input.split('\n');

let i = 0;
const registers = new Map();
const instructions = lines.map((line) => {
  const register = line[4];
  switch (line.slice(0, 3)) {
    case 'hlf':
      return () => {
        registers.set(register, (registers.get(register) ?? 0) / 2);
        i++;
      };
    case 'tpl':
      return () => {
        registers.set(register, (registers.get(register) ?? 0) * 3);
        i++;
      };
    case 'inc':
      return () => {
        registers.set(register, (registers.get(register) ?? 0) + 1);
        i++;
      };
    case 'jmp': {
      const offset = Number(line.slice(4));
      return () => (i += offset);
    }
    case 'jie': {
      const offset = Number(line.slice(7));
      return () => {
        if ((registers.get(register) ?? 0) % 2 === 0) {
          i += offset;
        } else {
          i++;
        }
      };
    }
    case 'jio': {
      const offset = Number(line.slice(7));
      return () => {
        if ((registers.get(register) ?? 0) === 1) {
          i += offset;
        } else {
          i++;
        }
      };
    }
  }
  return () => {};
});

while (i >= 0 && i < lines.length) {
  instructions[i]!();
}
console.log(registers.get('b'));
