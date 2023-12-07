import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');
const hands = lines.map((line) => {
  const [hand, bid] = line.split(' ');
  return [hand, Number(bid)];
});

const CARD_STRENGTH = new Map([
  ['2', 0],
  ['3', 1],
  ['4', 2],
  ['5', 3],
  ['6', 4],
  ['7', 5],
  ['8', 6],
  ['9', 7],
  ['T', 8],
  ['J', 9],
  ['Q', 10],
  ['K', 11],
  ['A', 12],
]);

function getHandStrength(hand) {
  const cardCounts = new Map();
  for (const card of hand) {
    cardCounts.set(card, (cardCounts.get(card) ?? 0) + 1);
  }
  const counts = [...cardCounts.values()];

  switch (cardCounts.size) {
    case 1:
      return 6;
    case 2:
      if (counts.includes(4)) {
        return 5;
      }
      return 4;
    case 3:
      if (counts.includes(3)) {
        return 3;
      }
      return 2;
    case 4:
      return 1;
  }
  return 0;
}

const rankedHands = hands.toSorted(([a], [b]) => {
  const [strengthA, strengthB] = [a, b].map(getHandStrength);
  if (strengthA === strengthB) {
    for (let i = 0; i < a.length; i++) {
      const [cardStrengthA, cardStrengthB] = [a[i], b[i]].map((card) =>
        CARD_STRENGTH.get(card)
      );
      if (cardStrengthA !== cardStrengthB) {
        return cardStrengthA - cardStrengthB;
      }
    }
  }
  return strengthA - strengthB;
});

let winnings = 0;
for (let i = 0; i < rankedHands.length; i++) {
  winnings += (i + 1) * rankedHands[i][1];
}

console.log(winnings);
