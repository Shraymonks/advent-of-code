import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n');

let platform = [...grid];
const rotated = [];
for (let x = platform[0].length - 1; x >= 0; x--) {
  let row = '';
  for (let y = 0; y < platform.length; y++) {
    row += platform[y][x];
  }
  rotated.push(row);
}
platform = rotated;

const CYCLES = 1e9;
let cyclePeriod = 0;
let cycleStart = null;
const cache = new Map();
const platformCycles = [];

for (let i = 0; i < CYCLES; i++) {
  const key = platform.join('\n');
  if (cache.has(key)) {
    const cached = cache.get(key);
    if (cycleStart == null) {
      cycleStart = cached.index;
    } else {
      cyclePeriod++;

      if (cached.index === cycleStart) {
        const cycleOffset = (CYCLES - cycleStart - 1) % cyclePeriod;
        platform = platformCycles[cycleOffset];
        break;
      }
    }
    platformCycles[cyclePeriod] = cached.platform;
    platform = cached.platform;
    continue;
  }

  for (let r = 0; r < 4; r++) {
    platform = platform.map((row) =>
      row.replaceAll(/[.O]*\.O[.O]*/g, (m) => {
        const numRocks = m.match(/O/g).length;
        return 'O'.repeat(numRocks) + '.'.repeat(m.length - numRocks);
      })
    );
    const rotated = [];
    for (let x = 0; x < platform[0].length; x++) {
      let row = '';
      for (let y = platform.length - 1; y >= 0; y--) {
        row += platform[y][x];
      }
      rotated.push(row);
    }
    platform = rotated;
  }

  cache.set(key, { index: i, platform });
}

let load = 0;
for (const row of platform) {
  for (let x = 0; x < row.length; x++) {
    if (row[x] === 'O') {
      load += row.length - x;
    }
  }
}
console.log(load);
