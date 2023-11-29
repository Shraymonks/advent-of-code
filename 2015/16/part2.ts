import { getInput } from '../utils.js';

const input = await getInput();
const lines = input.split('\n');

const myGifts = new Map([
  ['children', 3],
  ['cats', 7],
  ['samoyeds', 2],
  ['pomeranians', 3],
  ['akitas', 0],
  ['vizslas', 0],
  ['goldfish', 5],
  ['trees', 3],
  ['cars', 2],
  ['perfumes', 1],
]);

for (const line of lines) {
  const firstColon = line.indexOf(':');
  const sue = line.slice('Sue '.length, firstColon);
  const gifts: [string, number][] = line
    .slice(firstColon + 2)
    .split(', ')
    .map((giftString) => {
      const [gift, amount] = giftString.split(': ');
      return [gift!, Number(amount)];
    });
  const matchingGifts = gifts.every(([gift, count]) => {
    const giftCount = myGifts.get(gift)!;
    switch (gift) {
      case 'cats':
      case 'trees':
        return count > giftCount;
      case 'goldfish':
      case 'pomeranians':
        return count < giftCount;
    }
    return count === giftCount;
  });
  if (matchingGifts) {
    console.log(sue);
    break;
  }
}
