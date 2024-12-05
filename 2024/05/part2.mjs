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

  if (!isValidOrder(pages)) {
    const correctOrder = pages.toSorted((a, b) => {
      const pagesBeforeA = mustBefore.get(a) ?? new Set();
      if (pagesBeforeA.has(b)) {
        return 1;
      }
      const pagesBeforeB = mustBefore.get(b) ?? new Set();
      if (pagesBeforeB.has(a)) {
        return -1;
      }
      return 0;
    });
    sum += correctOrder[Math.floor(correctOrder.length / 2)];
  }
}
console.log(sum);
