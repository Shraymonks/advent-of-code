import { PriorityQueue } from 'js-sdsl';
import { getInput } from '../utils.mjs';

const input = await getInput();
const rows = input.split('\n');

let blizzards = [];

for (let y = 0; y < rows.length; y++) {
  const row = rows[y];
  for (let x = 0; x < row.length; x++) {
    if ('>v<^'.includes(row[x])) {
      blizzards.push({
        dir: row[x],
        x,
        y,
      });
    }
  }
}

const POTENTIAL_MOVES = [
  [1, 0],
  [0, 1],
  [0, 0],
  [-1, 0],
  [0, -1],
];

const start = [rows[0].indexOf('.'), 0];
const end = [rows[rows.length - 1].indexOf('.'), rows.length - 1];

const xEnd = rows[0].length - 2;
const yEnd = rows.length - 2;

const blizzardsAtTime = new Map([
  [0, new Set(blizzards.map(({ x, y }) => `${x},${y}`))],
]);

const visited = new Set();

const q = new PriorityQueue(
  [
    {
      goals: [end, start, end],
      priority: Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1]),
      time: 0,
      x: start[0],
      y: start[1],
    },
  ],
  (a, b) => a.priority - b.priority
);

while (q.length > 0) {
  const { goals, x, y, time } = q.pop();

  const goal = goals[0];
  if (x === goal[0] && y === goal[1]) {
    q.clear();
    goals.shift();
    if (goals.length === 0) {
      console.log(time);
      break;
    }
    q.push({
      goals,
      priority: time + Math.abs(goal[0] - x) + Math.abs(goal[1] - y),
      x,
      y,
      time,
    });
  }

  const key = `${time}:${x},${y}`;
  if (visited.has(key)) {
    continue;
  }
  visited.add(key);

  const newTime = time + 1;

  if (!blizzardsAtTime.has(newTime)) {
    blizzards = blizzards.map(({ dir, x, y }) => {
      switch (dir) {
        case '>':
          if (x < xEnd) {
            return { dir, x: x + 1, y };
          }
          return { dir, x: 1, y };
        case 'v':
          if (y < yEnd) {
            return { dir, x, y: y + 1 };
          }
          return { dir, x, y: 1 };
        case '<':
          if (x > 1) {
            return { dir, x: x - 1, y };
          }
          return { dir, x: xEnd, y };
        case '^':
          if (y > 1) {
            return { dir, x, y: y - 1 };
          }
          return { dir, x, y: yEnd };
      }
    });
    blizzardsAtTime.set(
      newTime,
      new Set(blizzards.map(({ x, y }) => `${x},${y}`))
    );
  }

  const currentBlizzards = blizzardsAtTime.get(newTime);

  for (const [xDelta, yDelta] of POTENTIAL_MOVES) {
    const newX = x + xDelta;
    const newY = y + yDelta;
    if (
      newX >= 0 &&
      newY >= 0 &&
      newX < rows[0].length &&
      newY < rows.length &&
      rows[newY][newX] !== '#' &&
      !currentBlizzards.has(`${newX},${newY}`)
    ) {
      q.push({
        goals,
        priority: time + Math.abs(goal[0] - newX) + Math.abs(goal[1] - newY),
        x: newX,
        y: newY,
        time: newTime,
      });
    }
  }
}
