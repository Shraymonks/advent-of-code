import { getInput } from '../utils.mjs';

const input = await getInput();
const motions = input.split('\n');

const knots = [];
for (let i = 0; i < 10; i++) {
  knots.push([0, 0]);
}

const visited = new Set([knots[0].toString()]);

function moveHead(dir) {
  const H = knots[0];
  switch (dir) {
    case 'U':
      H[1]++;
      break;
    case 'R':
      H[0]++;
      break;
    case 'D':
      H[1]--;
      break;
    case 'L':
      H[0]--;
      break;
  }

  let last = H;
  for (let i = 1; i < knots.length; i++) {
    const knot = knots[i];
    const xDiff = last[0] - knot[0];
    const yDiff = last[1] - knot[1];
    if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
      if (xDiff !== 0) {
        knot[0] += xDiff > 0 ? 1 : -1;
      }
      if (yDiff !== 0) {
        knot[1] += yDiff > 0 ? 1 : -1;
      }
    }
    last = knot;
  }
  visited.add(last.toString());
}

for (const motion of motions) {
  const [dir, stepsInput] = motion.split(' ');
  const steps = Number(stepsInput);

  for (let i = 0; i < steps; i++) {
    moveHead(dir);
  }
}

console.log(visited.size);
