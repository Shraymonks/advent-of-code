import { getInput } from '../utils.mjs';

const input = await getInput();
const pairs = input.split('\n\n');

function compare(a, b) {
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray && bIsArray) {
    const minLength = Math.min(a.length, b.length);
    for (let i = 0; i < minLength; i++) {
      const comparison = compare(a[i], b[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    if (a.length < b.length) {
      return -1;
    }
    if (a.length > b.length) {
      return 1;
    }
    return 0;
  }

  if (!aIsArray && !bIsArray) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  return compare(aIsArray ? a : [a], bIsArray ? b : [b]);
}

let correct = 0;
for (let i = 0; i < pairs.length; i++) {
  const packets = pairs[i].split('\n').map(JSON.parse);
  if (compare(...packets) === -1) {
    correct += i + 1;
  }
}
console.log(correct);
