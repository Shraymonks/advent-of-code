import { getInput } from '../utils.mjs';

const input = await getInput();
const [seedsString, ...maps] = input.split('\n\n');
const seeds = seedsString.slice('seeds: '.length).split(' ').map(Number);
const mappings = maps.map((map) => {
  const [, ...ranges] = map.split('\n');
  return ranges.map((r) => {
    const [dest, source, range] = r.split(' ').map(Number);
    return { dest, range, source };
  });
});

let minLocation = Infinity;
for (const seed of seeds) {
  let value = seed;
  for (const ranges of mappings) {
    for (const { dest, range, source } of ranges) {
      if (value >= source && value < source + range) {
        value += dest - source;
        break;
      }
    }
  }
  minLocation = Math.min(minLocation, value);
}

console.log(minLocation);
