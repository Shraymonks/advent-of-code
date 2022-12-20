import { getInput } from '../utils.mjs';

const input = await getInput();
const numbers = input.split('\n').map(Number);

let mix = numbers.map((n) => Symbol(n));
const symbolMap = new Map(numbers.map((n, i) => [mix[i], n]));
const [zeroSymbol] = [...symbolMap].find(([symbol, n]) => n === 0);
const mod = mix.length - 1;

for (const [symbol, n] of symbolMap) {
  const index = mix.indexOf(symbol);
  const newIndex = (((index + n) % mod) + mod) % mod;
  if (newIndex === index) {
    continue;
  }
  if (newIndex > index) {
    mix = [
      ...mix.slice(0, index),
      ...mix.slice(index + 1, newIndex + 1),
      symbol,
      ...mix.slice(newIndex + 1),
    ];
  } else {
    mix = [
      ...mix.slice(0, newIndex),
      symbol,
      ...mix.slice(newIndex, index),
      ...mix.slice(index + 1),
    ];
  }
}

let sum = 0;
const zeroIndex = mix.indexOf(zeroSymbol);
for (const grove of [1000, 2000, 3000]) {
  sum += symbolMap.get(mix[(zeroIndex + grove) % mix.length]);
}
console.log(sum);
