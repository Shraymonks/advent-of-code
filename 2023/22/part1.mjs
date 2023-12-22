import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const bricks = lines.map((line) =>
  line.split('~').map((pos) => pos.split(',').map(Number))
);
bricks.sort((a, b) => {
  return Math.min(a[0][2], a[1][2]) - Math.min(b[0][2], b[1][2]);
});

const brickMap = new Map();
const canDisintegrate = new Set();
const maxZ = new Map();

for (const [i, [[x1, y1, z1], [x2, y2, z2]]] of bricks.entries()) {
  canDisintegrate.add(i);
  let maxZUnderBrick = 0;
  const landedOn = new Set();
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      const z = maxZ.get(`${x},${y}`) ?? 0;
      if (z > maxZUnderBrick) {
        landedOn.clear();
        maxZUnderBrick = z;
      }
      if (z > 0 && z === maxZUnderBrick) {
        landedOn.add(brickMap.get(`${x},${y},${z}`));
      }
    }
  }
  if (landedOn.size === 1) {
    for (const brick of landedOn) {
      canDisintegrate.delete(brick);
    }
  }
  const maxLandedZ = maxZUnderBrick + z2 - z1 + 1;
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      maxZ.set(`${x},${y}`, maxLandedZ);
      brickMap.set(`${x},${y},${maxLandedZ}`, i);
    }
  }
}
console.log(canDisintegrate.size);
