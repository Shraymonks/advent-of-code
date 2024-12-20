import { getInput } from '../utils.mjs';

const input = await getInput();
const [patternsInput, designsInput] = input.split('\n\n');

const patterns = patternsInput.split(', ');
const designs = designsInput.split('\n');

const cache = new Map();

function getNum(str) {
  if (cache.has(str)) {
    return cache.get(str);
  }

  let ways = 0;
  for (const pattern of patterns) {
    if (pattern === str) {
      ways++;
    } else if (str.startsWith(pattern)) {
      ways += getNum(str.slice(pattern.length));
    }
  }
  cache.set(str, ways);
  return ways;
}

let ways = 0;
for (const design of designs) {
  ways += getNum(design);
}
console.log(ways);
