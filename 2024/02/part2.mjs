import { getInput } from '../utils.mjs';

const input = await getInput();
const reports = input
  .split('\n')
  .map((report) => report.split(' ').map(Number));

function isSafe(levels) {
  let increasing = true;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] <= levels[i - 1]) {
      increasing = false;
      break;
    }
  }
  let decreasing = true;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] >= levels[i - 1]) {
      decreasing = false;
      break;
    }
  }
  if (!increasing && !decreasing) {
    return false;
  }
  for (let i = 1; i < levels.length; i++) {
    const diff = Math.abs(levels[i] - levels[i - 1]);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return true;
}

console.log(
  reports.filter((report) =>
    [...report.keys()].some((i) => isSafe(report.toSpliced(i, 1))),
  ).length,
);
