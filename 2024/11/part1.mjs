import { getInput } from '../utils.mjs';

const input = await getInput();
let stones = input.split(' ').map(Number);

function blink(stone) {
  if (stone === 0) {
    return 1;
  }
  const stoneStr = stone.toString();
  const halfLength = stoneStr.length / 2;
  if (stoneStr.length % 2 === 0) {
    return [stoneStr.slice(0, halfLength), stoneStr.slice(halfLength)].map(
      Number,
    );
  }
  return stone * 2024;
}

for (let i = 0; i < 25; i++) {
  stones = stones.map(blink).flat();
}
console.log(stones.length);
