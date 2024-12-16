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
  [{ dir, score: 0, seen: new Set(), x: startX, y: startY }],
  (a, b) => a.score - b.score,
);

let bestSeats = new Set();
let lowestScore = Infinity;
const minScoreAtTile = new Map();
while (q.length > 0) {
  const { dir, score, seen, x, y } = q.pop();

  if (score > lowestScore) {
    break;
  }
  const key = `${x},${y}:${dir}`;
  if (score > minScoreAtTile.get(key)) {
    continue;
  }
  seen.add(`${x},${y}`);
  minScoreAtTile.set(key, score);
  if (x === endX && y === endY) {
    lowestScore = score;
    bestSeats = bestSeats.union(seen);
    continue;
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
        seen: new Set(seen),
        x: nextX,
        y: nextY,
      });
    }
  }
}
console.log(bestSeats.size);
