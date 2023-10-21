import { getInput } from '../utils.js';

const input = await getInput();
const instructions = input.split('\n');

const lightsOn = new Set();

for (const i of instructions) {
  const [, type, x1String, y1String, x2String, y2String] = i.match(
    /(.+) (\d+),(\d+) through (\d+),(\d+)/
  )!;

  const [x1, y1, x2, y2] = [x1String, y1String, x2String, y2String].map(
    Number
  ) as [number, number, number, number];

  function performInstruction(
    action: (coord: `${number},${number}`) => void
  ): void {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        action(`${x},${y}`);
      }
    }
  }

  switch (type) {
    case 'turn on':
      performInstruction((coord) => {
        lightsOn.add(coord);
      });
      break;
    case 'turn off':
      performInstruction((coord) => {
        lightsOn.delete(coord);
      });
      break;
    case 'toggle':
      performInstruction((coord) => {
        if (lightsOn.has(coord)) {
          lightsOn.delete(coord);
        } else {
          lightsOn.add(coord);
        }
      });
      break;
  }
}

console.log(lightsOn.size);
