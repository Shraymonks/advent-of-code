import { getInput } from '../utils.mjs';

const input = await getInput();
const stones = input.split(' ').map(Number);

function blink(stone) {
  if (stone === 0) {
    return [1];
  }
  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    const splitIndex = stoneStr.length / 2;
    return [stoneStr.slice(0, splitIndex), stoneStr.slice(splitIndex)].map(
      Number,
    );
  }
  return [stone * 2024];
}

let stoneCounts = new Map();
for (const stone of stones) {
  stoneCounts.set(stone, (stoneCounts.get(stone) ?? 0) + 1);
}
for (let i = 0; i < 75; i++) {
  const nextStoneCounts = new Map();
  for (const [stone, count] of stoneCounts) {
    for (const blinked of blink(stone)) {
      nextStoneCounts.set(blinked, (nextStoneCounts.get(blinked) ?? 0) + count);
    }
  }
  stoneCounts = nextStoneCounts;
}

let totalStones = 0;
for (const count of stoneCounts.values()) {
  totalStones += count;
}
console.log(totalStones);
