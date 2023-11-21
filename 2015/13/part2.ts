import { getInput } from '../utils.js';

const input = await getInput();
const lines = input.split('\n');

const happinessMap = new Map();

for (const line of lines) {
  const [, a, type, deltaString, b] = line.match(
    /(.+) would (.+) (.+) happiness units by sitting next to (.+)\./
  )!;

  const delta = Number(deltaString);
  const isGain = type === 'gain';

  if (!happinessMap.has(a)) {
    happinessMap.set(a, new Map());
  }
  happinessMap.get(a).set(b, (isGain ? 1 : -1) * delta);
}

const guests = new Set([...happinessMap.keys(), 'me']);

function permutations([first, ...rest]: string[]): string[][] {
  if (first == null) {
    return [];
  }
  if (rest.length === 0) {
    return [[first]];
  }
  const result = [];
  const subPermutations = permutations(rest);
  for (const permutation of subPermutations) {
    for (let i = 0; i <= permutation.length; i++) {
      const copy = [...permutation];
      copy.splice(i, 0, first);
      result.push(copy);
    }
  }
  return result;
}

const perms = permutations([...guests]);

let maxHappiness = -Infinity;
for (const permutation of perms) {
  let happiness = 0;
  for (let i = 0; i < permutation.length; i++) {
    const guestHappiness = happinessMap.get(permutation[i]);
    if (guestHappiness) {
      happiness +=
        (guestHappiness.get(permutation.at(i - 1)) ?? 0) +
        (guestHappiness.get(permutation.at((i + 1) % permutation.length)) ?? 0);
    }
  }
  maxHappiness = Math.max(maxHappiness, happiness);
}

console.log(maxHappiness);
