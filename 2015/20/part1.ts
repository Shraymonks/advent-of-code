import { getInput } from '../utils.js';

const input = await getInput();
const presentsLimit = Number(input);

function getTotalPresents(n: number): number {
  const root = Math.floor(Math.sqrt(n));
  let presents = n + 1;
  for (let i = 2; i <= root; i++) {
    if (n % i === 0) {
      presents += i + n / i;
    }
  }
  if (n / root === root) {
    presents -= root;
  }
  return presents * 10;
}

let house = 1;
while (getTotalPresents(house) < presentsLimit) {
  house++;
}
console.log(house);
