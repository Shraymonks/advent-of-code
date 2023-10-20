import { getInput } from '../utils.js';

const input = await getInput();
const strings = input.split('\n');

const nice = strings.filter((s) => {
  const pairs = new Map();
  let hasInbetween = false;
  let hasPair = false;

  for (let i = 1; i < s.length; i++) {
    const duo = `${s[i - 1]}${s[i]}`;
    if (!pairs.has(duo)) {
      pairs.set(duo, i);
    } else if (pairs.get(duo) !== i - 1) {
      hasPair = true;
    }

    if (s[i - 2] === s[i]) {
      hasInbetween = true;
    }
  }

  return hasPair && hasInbetween;
});

console.log(nice.length);
