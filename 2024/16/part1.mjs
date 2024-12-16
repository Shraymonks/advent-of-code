import { PriorityQueue } from 'js-sdsl';
import { getInput } from '../utils.mjs';

const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const input = await getInput();
const grid = input.split('\n');

const startY = grid.findIndex((row) => row.includes('S'));
const startX = grid[startY].indexOf('S');

const endY = grid.findIndex((row) => row.includes('E'));
const endX = grid[endY].indexOf('E');

let dir = 0;

const q = new PriorityQueue(
  [{ dir, score: 0, x: startX, y: startY }],
  (a, b) => a.score - b.score,
);

const seen = new Set();
while (q.length > 0) {
  const { dir, score, x, y } = q.pop();

  const key = `${x},${y}`;
  if (seen.has(key)) {
    continue;
  }
  seen.add(key);
  if (x === endX && y === endY) {
    console.log(score);
    break;
  }

  for (let i = -1; i <= 1; i++) {
    const nextDir = (((dir + i) % DIRS.length) + DIRS.length) % DIRS.length;
    const [dx, dy] = DIRS[nextDir];
    const nextX = x + dx;
    const nextY = y + dy;
    if (grid[nextY][nextX] !== '#') {
      q.push({
        dir: nextDir,
        score: score + (i === 0 ? 1 : 1001),
        x: nextX,
        y: nextY,
      });
    }
  }
}
