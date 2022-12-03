import { getInput } from '../utils.mjs';

const input = await getInput();
const sacks = input.split('\n');

const a_CODE = 97;
const A_CODE = 65;

function priority(item) {
  const code = item.charCodeAt(0);
  // a-z 97-122
  if (code >= a_CODE) {
    return code - a_CODE + 1; // 1-26
  }
  // A-Z 65-90
  return code - A_CODE + 27; // 27-52
}

let sum = 0;
for (const sack of sacks) {
  const halfIndex = sack.length / 2;
  const first = [...sack.substring(0, halfIndex)];
  const second = new Set([...sack.substring(halfIndex)]);

  const match = first.find((item) => second.has(item));
  sum += priority(match);
}

console.log(sum);
