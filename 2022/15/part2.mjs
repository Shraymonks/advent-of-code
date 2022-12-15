import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

function dist([x, y], [x2, y2]) {
  return Math.abs(x - x2) + Math.abs(y - y2);
}

const MAX = 4000000;

const sensors = [];
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
  sensors.push({ pos: sensor, range });
}

search: for (const { pos, range } of sensors) {
  for (let x = pos[0], y = pos[1] + range + 1; y !== pos[1]; x++, y--) {
    if (
      x >= 0 &&
      y >= 0 &&
      x <= MAX &&
      y <= MAX &&
      sensors.every((sensor) => dist(sensor.pos, [x, y]) > sensor.range)
    ) {
      console.log(x * MAX + y);
      break search;
    }
  }
}
