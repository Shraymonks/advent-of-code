import { getInput } from '../utils.mjs';

const input = await getInput();
const [seedsString, ...maps] = input.split('\n\n');
const seeds = seedsString.slice('seeds: '.length).split(' ').map(Number);
const mappings = maps
  .map((map) => {
    const [, ...ranges] = map.split('\n');
    return ranges.map((r) => {
      const [dest, source, range] = r.split(' ').map(Number);
      return { dest, range, source };
    });
  })
  .toReversed();

function isSeedNumber(n) {
  for (let pairIndex = 0; pairIndex < seeds.length; pairIndex += 2) {
    if (n >= seeds[pairIndex] && n < seeds[pairIndex] + seeds[pairIndex + 1]) {
      return true;
    }
  }
  return false;
}

for (let i = 0; ; i++) {
  let value = i;
  for (const ranges of mappings) {
    for (const { dest, range, source } of ranges) {
      if (value >= dest && value < dest + range) {
        value += source - dest;
        break;
      }
    }
  }
  if (isSeedNumber(value)) {
    console.log(i);
    break;
  }
}
