import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

function dist([x, y], [x2, y2]) {
  return Math.abs(x - x2) + Math.abs(y - y2);
}

const TARGET_ROW = 2000000;
const intervals = [];
const exclude = new Set();

for (const line of lines) {
  const [sensorInput, beaconInput] = line.split(': ');
  const sensor = sensorInput
    .replace('Sensor at x=', '')
    .replace(' y=', '')
    .split(',')
    .map(Number);
  const beacon = beaconInput
    .replace('closest beacon is at x=', '')
    .replace(' y=', '')
    .split(',')
    .map(Number);

  const range = dist(sensor, beacon);
  const yTargetDist = Math.abs(sensor[1] - TARGET_ROW);

  if (yTargetDist <= range) {
    const xDiff = range - yTargetDist;
    intervals.push([sensor[0] - xDiff, sensor[0] + xDiff]);

    if (beacon[1] === TARGET_ROW) {
      exclude.add(beacon[0]);
    }
  }
}

intervals.sort(([s, e], [s2, e2]) => (s === s2 ? e - e2 : s - s2));

let count = 0;
let last = -Infinity;
for (const [start, end] of intervals) {
  const maxEnd = Math.max(last, end);
  if (start > last) {
    count += end - start + 1;
  } else {
    count += maxEnd - last;
  }
  last = maxEnd;
}

console.log(count - exclude.size);
