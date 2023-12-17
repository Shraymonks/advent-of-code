import { PriorityQueue } from 'js-sdsl';
import { getInput } from '../utils.mjs';

const input = await getInput();
const grid = input.split('\n').map((row) => Array.from(row, Number));

function getMoves({ consecutive, dx, dy }) {
  const moves = [];
  if (consecutive >= 4) {
    moves.push(
      { newConsecutive: 1, newDx: dy, newDy: dx },
      { newConsecutive: 1, newDx: -dy, newDy: -dx }
    );
  }
  if (consecutive < 10) {
    moves.push({ newConsecutive: consecutive + 1, newDx: dx, newDy: dy });
  }
  return moves;
}

const yTarget = grid.length - 1;
const xTarget = grid[yTarget].length - 1;

const q = new PriorityQueue(
  [
    {
      consecutive: 0,
      dx: 1,
      dy: 0,
      totalHeatLoss: 0,
      x: 0,
      y: 0,
    },
    {
      consecutive: 0,
      dx: 0,
      dy: 1,
      totalHeatLoss: 0,
      x: 0,
      y: 0,
    },
  ],
  (a, b) => a.totalHeatLoss - b.totalHeatLoss
);

const minHeatLoss = new Map();

while (q.length > 0) {
  const { consecutive, dx, dy, totalHeatLoss, x, y } = q.pop();

  const key = `${x},${y}:${dx},${dy}:${consecutive}`;
  const min = minHeatLoss.get(key) ?? Infinity;
  if (totalHeatLoss >= min) {
    continue;
  }
  minHeatLoss.set(key, totalHeatLoss);

  if (x === xTarget && y === yTarget && consecutive >= 4) {
    console.log(totalHeatLoss);
    break;
  }

  const moves = getMoves({ consecutive, dx, dy });
  for (const { newDx, newDy, newConsecutive } of moves) {
    const newX = x + newDx;
    const newY = y + newDy;
    const heatLoss = grid[newY]?.[newX];
    if (heatLoss) {
      q.push({
        consecutive: newConsecutive,
        dx: newDx,
        dy: newDy,
        totalHeatLoss: totalHeatLoss + heatLoss,
        x: newX,
        y: newY,
      });
    }
  }
}
