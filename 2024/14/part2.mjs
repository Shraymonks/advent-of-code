import { getInput } from '../utils.mjs';

const WIDTH = 101;
const HEIGHT = 103;

const input = await getInput();
const robots = input
  .split('\n')
  .map((robot) => [...robot.matchAll(/-?\d+/g).map((n) => Number(n))]);

for (let t = 0; ; t++) {
  const positions = [];
  for (let y = 0; y < HEIGHT; y++) {
    positions.push([]);
  }
  for (const [pX, pY, vX, vY] of robots) {
    const x = (((pX + vX * t) % WIDTH) + WIDTH) % WIDTH;
    const y = (((pY + vY * t) % HEIGHT) + HEIGHT) % HEIGHT;
    positions[y][x] = 'X';
  }
  if (
    positions.some((row) =>
      row.some((_, i) => {
        for (let j = 0; j < 10; j++) {
          if (row[i + j] !== 'X') {
            return false;
          }
        }
        return true;
      }),
    )
  ) {
    console.log(t);
    break;
  }
}
