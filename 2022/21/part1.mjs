import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const monkeys = new Map();
for (const line of lines) {
  const [monkey, job] = line.split(': ');
  const operation = job.split(' ');

  let getResult;
  if (operation.length === 1) {
    getResult = () => Number(job);
  } else {
    const [m1, op, m2] = operation;
    let f;
    switch (op) {
      case '+':
        f = (a, b) => a + b;
        break;
      case '-':
        f = (a, b) => a - b;
        break;
      case '*':
        f = (a, b) => a * b;
        break;
      case '/':
        f = (a, b) => a / b;
        break;
    }
    getResult = () => f(monkeys.get(m1)(), monkeys.get(m2)());
  }
  monkeys.set(monkey, getResult);
}

console.log(monkeys.get('root')());
