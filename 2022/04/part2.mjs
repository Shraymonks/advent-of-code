import { getInput } from '../utils.mjs';

const input = await getInput();
const assignments = input.split('\n');

let count = 0;
for (const assignment of assignments) {
  const [pair1, pair2] = assignment.split(',');
  const [start1, end1] = pair1.split('-').map(Number);
  const [start2, end2] = pair2.split('-').map(Number);

  if (
    (start1 >= start2 && end1 <= start2) ||
    (start1 <= end2 && end1 >= end2) ||
    (start2 >= start1 && end2 <= start1) ||
    (start2 <= end1 && end2 >= end1)
  ) {
    count++;
  }
}

console.log(count);
