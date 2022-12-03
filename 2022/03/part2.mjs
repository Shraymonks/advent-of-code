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
const numGroups = sacks.length / 3;
for (let i = 0; i < numGroups; i++) {
  const startIndex = i * 3;
  const group = sacks.slice(startIndex, startIndex + 3);

  const [badge] = group.reduce((intersection, sack) =>
    [...intersection].filter((item) => new Set([...sack]).has(item))
  );
  sum += priority(badge);
}

console.log(sum);
