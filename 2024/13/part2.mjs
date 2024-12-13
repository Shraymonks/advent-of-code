import { getInput } from '../utils.mjs';

const input = await getInput();
const machines = input.split('\n\n');

let tokens = 0;
for (const machine of machines) {
  const [a, b, prize] = machine
    .matchAll(/(\d+), Y.(\d+)/g)
    .map(([, x, y]) => ({ x: Number(x), y: Number(y) }));
  prize.x += 10000000000000;
  prize.y += 10000000000000;

  const bPresses = (prize.x * a.y - prize.y * a.x) / (b.x * a.y - b.y * a.x);
  if (Number.isInteger(bPresses)) {
    const aPresses = (prize.x - bPresses * b.x) / a.x;
    tokens += aPresses * 3 + bPresses;
  }
}
console.log(tokens);
