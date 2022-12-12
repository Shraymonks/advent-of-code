import { getInput } from '../utils.mjs';

const input = await getInput();
const hill = input
  .split('\n')
  .map((row) => [...row].map((char) => char.charCodeAt(0)));

const S_CODE = 'S'.charCodeAt(0);
const E_CODE = 'E'.charCodeAt(0);
const a_CODE = 'a'.charCodeAt(0);
const z_CODE = 'z'.charCodeAt(0);

let start;
let end;

const rows = hill.length;
const cols = hill[0].length;
const minSteps = [];
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    switch (hill[y][x]) {
      case S_CODE:
        start = [x, y];
        hill[y][x] = a_CODE;
        break;
      case E_CODE:
        end = [x, y];
        hill[y][x] = z_CODE;
        break;
    }
  }
  minSteps.push(Array(hill.length).fill(Infinity));
}

const q = [
  {
    x: start[0],
    y: start[1],
    steps: 0,
  },
];

while (q.length > 0) {
  const { x, y, steps } = q.shift();

  if (x === end[0] && y === end[1]) {
    console.log(steps);
    break;
  }
  if (steps >= minSteps[y][x]) {
    continue;
  }
  minSteps[y][x] = steps;

  const newSteps = steps + 1;
  [
    { x2: x, y2: y - 1 },
    { x2: x + 1, y2: y },
    { x2: x, y2: y + 1 },
    { x2: x - 1, y2: y },
  ]
    .filter(
      ({ x2, y2 }) =>
        x2 >= 0 &&
        y2 >= 0 &&
        x2 < cols &&
        y2 < rows &&
        hill[y2][x2] - hill[y][x] <= 1
    )
    .forEach(({ x2, y2 }) => {
      q.push({
        x: x2,
        y: y2,
        steps: newSteps,
      });
    });
}
