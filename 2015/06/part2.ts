import { getInput } from '../utils.js';

const input = await getInput();
const instructions = input.split('\n');

const lightsOn = new Map();

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
        lightsOn.set(coord, (lightsOn.get(coord) ?? 0) + 1);
      });
      break;
    case 'turn off':
      performInstruction((coord) => {
        if (lightsOn.has(coord)) {
          const brightness = lightsOn.get(coord);
          if (brightness <= 1) {
            lightsOn.delete(coord);
          } else {
            lightsOn.set(coord, brightness - 1);
          }
        }
      });
      break;
    case 'toggle':
      performInstruction((coord) => {
        lightsOn.set(coord, (lightsOn.get(coord) ?? 0) + 2);
      });
      break;
  }
}

console.log(
  [...lightsOn.values()].reduce((sum, brightness) => sum + brightness)
);
