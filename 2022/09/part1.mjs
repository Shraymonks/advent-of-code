import { getInput } from '../utils.mjs';

const input = await getInput();
const motions = input.split('\n');

let H = [0, 0];
let T = [0, 0];

const visited = new Set([H.toString()]);

function moveHead(dir) {
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

  const xDiff = H[0] - T[0];
  const yDiff = H[1] - T[1];
  if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
    if (xDiff !== 0) {
      T[0] += xDiff > 0 ? 1 : -1;
    }
    if (yDiff !== 0) {
      T[1] += yDiff > 0 ? 1 : -1;
    }
    visited.add(T.toString());
  }
}

for (const motion of motions) {
  const [dir, stepsInput] = motion.split(' ');
  const steps = Number(stepsInput);

  for (let i = 0; i < steps; i++) {
    moveHead(dir);
  }
}

console.log(visited.size);
