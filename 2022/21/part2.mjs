import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const monkeys = new Map();
for (const line of lines) {
  const [monkey, job] = line.split(': ');
  const operation = job.split(' ');

  let getResult;
  let setHasHumn;
  if (operation.length === 1) {
    getResult = () => Number(job);
    setHasHumn = () => monkey === 'humn';
    monkeys.set(monkey, {
      getResult,
      setHasHumn,
    });
  } else {
    const [m1, op, m2] = operation;
    setHasHumn = () => [m1, m2].some((m) => monkeys.get(m).setHasHumn());

    let f;
    let getHumanResult;
    let inverse;
    let rInverse;
    switch (op) {
      case '+':
        f = (a, b) => a + b;
        inverse = (a, b) => a - b;
        rInverse = (a, b) => a - b;
        break;
      case '-':
        f = (a, b) => a - b;
        inverse = (a, b) => a + b;
        rInverse = (a, b) => b - a;
        break;
      case '*':
        f = (a, b) => a * b;
        inverse = (a, b) => a / b;
        rInverse = (a, b) => a / b;
        break;
      case '/':
        f = (a, b) => a / b;
        inverse = (a, b) => a * b;
        rInverse = (a, b) => b / a;
        break;
    }
    getHumanResult = (rootValue) => {
      const leftHasHumn = monkeys.get(m1).setHasHumn();
      const nextRootValue = (leftHasHumn ? inverse : rInverse)(
        rootValue,
        monkeys.get(leftHasHumn ? m2 : m1).getResult()
      );
      if ([m1, m2].includes('humn')) {
        return nextRootValue;
      }
      return monkeys.get(leftHasHumn ? m1 : m2).getHumanResult(nextRootValue);
    };
    getResult = () => {
      const leftHasHumn = monkeys.get(m1).setHasHumn();
      const rightHasHumn = monkeys.get(m2).setHasHumn();

      if (leftHasHumn === rightHasHumn) {
        return f(monkeys.get(m1).getResult(), monkeys.get(m2).getResult());
      }
      return monkeys
        .get(leftHasHumn ? m1 : m2)
        .getHumanResult(monkeys.get(leftHasHumn ? m2 : m1).getResult());
    };
    monkeys.set(monkey, {
      getHumanResult,
      getResult,
      setHasHumn,
    });
  }
}

console.log(monkeys.get('root').getResult());
