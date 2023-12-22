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
const supports = new Map();
const supportedBy = new Map();
const maxZ = new Map();
const willFall = new Set();

for (const [i, [[x1, y1, z1], [x2, y2, z2]]] of bricks.entries()) {
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
  for (const brick of landedOn) {
    if (!supports.has(brick)) {
      supports.set(brick, []);
    }
    supports.get(brick).push(i);

    if (!supportedBy.has(i)) {
      supportedBy.set(i, []);
    }
    supportedBy.get(i).push(brick);
  }
  if (landedOn.size === 1) {
    for (const brick of landedOn) {
      willFall.add(brick);
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

let total = 0;
for (const brick of willFall) {
  const fallen = new Set([brick]);
  const q = [...(supports.get(brick) ?? [])];
  while (q.length > 0) {
    const currentBrick = q.pop();
    const supportBricks = supportedBy.get(currentBrick);
    if (supportBricks.every((x) => fallen.has(x))) {
      fallen.add(currentBrick);
      const bricksSupported = supports.get(currentBrick) ?? [];
      q.push(...bricksSupported);
    }
  }
  total += fallen.size - 1;
}
console.log(total);
