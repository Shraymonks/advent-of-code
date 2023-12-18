import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const MOVES = {
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
  U: [0, -1],
};

let x = 0;
let y = 0;

const points = [];

let boundary = 0;
for (const line of lines) {
  const [dir, length] = line.split(' ');
  const distance = Number(length);
  const [dx, dy] = MOVES[dir];

  boundary += distance;
  x += dx * distance;
  y += dy * distance;
  points.push([x, y]);
}

let area = 0;
for (const [i, [x1, y1]] of points.entries()) {
  const [x2, y2] = points[(i + 1) % points.length];
  area += (y1 + y2) * (x1 - x2);
}
area = Math.abs(area / 2);

const interior = area + 1 - boundary / 2;
console.log(interior + boundary);
