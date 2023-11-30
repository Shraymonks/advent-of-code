import { getInput } from '../utils.js';

const input = await getInput();
const presentsLimit = Number(input);

function getPresents(elf: number, house: number): number {
  return house <= elf * 50 ? elf * 11 : 0;
}
function getTotalPresents(n: number): number {
  const root = Math.floor(Math.sqrt(n));
  let presents = getPresents(1, n) + getPresents(n, n);
  for (let i = 2; i <= root; i++) {
    if (n % i === 0) {
      presents += getPresents(i, n) + getPresents(n / i, n);
    }
  }
  if (n / root === root) {
    presents -= getPresents(root, n);
  }
  return presents;
}

let house = 1;
while (getTotalPresents(house) < presentsLimit) {
  house++;
}
console.log(house);
