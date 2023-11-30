import { getInput } from '../utils.js';

const input = await getInput();
const weights = input.split('\n').map(Number);
const descending = weights.toReversed();

function sum(list: number[]): number {
  return list.reduce((sum, item) => sum + item, 0);
}
function product(list: number[]): number {
  return list.reduce((sum, item) => sum * item, 1);
}
const totalWeight = sum(weights);
const compartmentWeight = totalWeight / 3;

function* getCombinations(set: number[], k: number): Generator<number[]> {
  if (k >= 0 && k <= set.length) {
    if (k == 0) {
      yield [];
    } else {
      for (const [i, v] of set.entries()) {
        for (const next of getCombinations(set.slice(i + 1), k - 1)) {
          yield [v, ...next];
        }
      }
    }
  }
}

let firstCompartmentSize = 1;
let minEntanglement = Infinity;

while (!Number.isFinite(minEntanglement)) {
  const combinations = getCombinations(descending, firstCompartmentSize);

  for (const combination of combinations) {
    const currentSum = sum(combination);
    if (currentSum === compartmentWeight) {
      minEntanglement = Math.min(minEntanglement, product(combination));
    }
  }
  firstCompartmentSize++;
}

console.log(minEntanglement);
