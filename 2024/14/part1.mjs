import { getInput } from '../utils.mjs';

const WIDTH = 101;
const HEIGHT = 103;
const TIME = 100;

const input = await getInput();
const robots = input.split('\n');

const quadrantSafety = [
  [0, 0],
  [0, 0],
];

const midX = Math.floor(WIDTH / 2);
const midY = Math.floor(HEIGHT / 2);

for (const robot of robots) {
  const [pX, pY, vX, vY] = robot.matchAll(/-?\d+/g).map((n) => Number(n));

  const x = (((pX + vX * TIME) % WIDTH) + WIDTH) % WIDTH;
  const y = (((pY + vY * TIME) % HEIGHT) + HEIGHT) % HEIGHT;

  let quadX;
  if (x < midX) {
    quadX = 0;
  } else if (x > midX) {
    quadX = 1;
  }
  let quadY;
  if (y < midY) {
    quadY = 0;
  } else if (y > midY) {
    quadY = 1;
  }

  if (quadX != null && quadY != null) {
    quadrantSafety[quadY][quadX]++;
  }
}

let totalSafety = 1;
for (const row of quadrantSafety) {
  for (const safety of row) {
    totalSafety *= safety;
  }
}
console.log(totalSafety);
