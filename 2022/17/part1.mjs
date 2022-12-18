import { getInput } from '../utils.mjs';

const input = await getInput();

const PATTERNS = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [0, 0],
    [1, 0],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
];

const filled = new Set();

const START_X = 2;
const START_Y = 3;
const WIDTH = 7;

let currentJet = -1;
let currentShape = -1;
let height = 0;
let x = START_X;
let y = START_Y;
let isFalling = false;

function getDir() {
  currentJet = (currentJet + 1) % input.length;
  return input[currentJet];
}

function getShape() {
  currentShape = (currentShape + 1) % PATTERNS.length;
  return PATTERNS[currentShape];
}

function checkCollision(shape) {
  let newX = x;
  let newY = y;

  if (isFalling) {
    newY--;
  } else if (getDir() === '>') {
    newX++;
  } else {
    newX--;
  }

  if (
    shape
      .map(([x2, y2]) => [x2 + newX, y2 + newY])
      .every(
        ([x2, y2]) =>
          x2 >= 0 && y2 >= 0 && x2 < WIDTH && !filled.has(`${x2},${y2}`)
      )
  ) {
    x = newX;
    y = newY;
  } else if (isFalling) {
    return false;
  }
  isFalling = !isFalling;
  return true;
}

function landShape(shape) {
  let maxHeight = 0;
  for (const [x2, y2] of shape.map(([x2, y2]) => [x2 + x, y2 + y])) {
    filled.add(`${x2},${y2}`);
    maxHeight = Math.max(maxHeight, y2);
  }
  height = Math.max(maxHeight + 1, height);
}

for (let i = 0; i < 2022; i++) {
  const shape = getShape();
  x = START_X;
  y = height + START_Y;
  isFalling = false;

  while (checkCollision(shape)) {}

  landShape(shape);
}
let output = '';
for (let y = 0; y < height; y++) {
  for (let x = 0; x < WIDTH; x++) {
    output += filled.has(`${x},${y}`) ? '#' : '.';
  }
  output += '\n';
}
console.log(output.split('\n').reverse().join('\n'));
console.log(height);
// console.log(filled);
