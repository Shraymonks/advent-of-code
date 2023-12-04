import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const numMatches = new Map();
const totalFromCard = new Map();

for (const line of lines) {
  const [card, numbers] = line.split(/\:\s+/);
  const cardNumber = Number(card.split(/\s+/)[1]);
  const [winning, yours] = numbers
    .split(/\s+\|\s+/)
    .map((nums) => nums.split(/\s+/).map(Number));
  const winningSet = new Set(winning);

  numMatches.set(cardNumber, yours.filter((n) => winningSet.has(n)).length);
}

let total = 0;
for (let card = numMatches.size; card > 0; card--) {
  const matches = numMatches.get(card);
  let numCards = 1;
  for (let i = 1; i <= matches && card + i <= numMatches.size; i++) {
    numCards += totalFromCard.get(card + i);
  }
  totalFromCard.set(card, numCards);
  total += numCards;
}

console.log(total);
