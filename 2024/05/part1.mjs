import { getInput } from '../utils.mjs';

const input = await getInput();
const [rules, updates] = input.split('\n\n').map((block) => block.split('\n'));

const mustBefore = new Map();
for (const rule of rules) {
  const [before, after] = rule.split('|').map(Number);
  mustBefore.set(after, (mustBefore.get(after) ?? new Set()).add(before));
}

function isValidOrder(list) {
  let invalidPagesBefore = new Set();
  for (const n of list) {
    if (invalidPagesBefore.has(n)) {
      return false;
    }
    invalidPagesBefore = invalidPagesBefore.union(
      mustBefore.get(n) ?? new Set(),
    );
  }
  return true;
}

let sum = 0;
for (const update of updates) {
  const pages = update.split(',').map(Number);

  if (isValidOrder(pages)) {
    sum += pages[Math.floor(pages.length / 2)];
  }
}
console.log(sum);
