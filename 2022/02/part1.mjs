import { getInput } from '../utils.mjs';

const input = await getInput();
const guide = input.split('\n');

function outcome(opponent, yours) {
  if (
    (opponent === 'A' && yours === 'X') ||
    (opponent === 'B' && yours === 'Y') ||
    (opponent === 'C' && yours === 'Z')
  ) {
    return 'tie';
  }

  if (
    (opponent === 'A' && yours === 'Y') ||
    (opponent === 'B' && yours === 'Z') ||
    (opponent === 'C' && yours === 'X')
  ) {
    return 'win';
  }
  return 'lose';
}

function score(opponent, yours) {
  let total = 0;
  switch (yours) {
    case 'X':
      total += 1;
      break;
    case 'Y':
      total += 2;
      break;
    case 'Z':
      total += 3;
      break;
  }
  switch (outcome(opponent, yours)) {
    case 'tie':
      total += 3;
      break;
    case 'win':
      total += 6;
      break;
  }
  return total;
}

let total = 0;
for (const round of guide) {
  const [opponent, yours] = round.split(' ');
  total += score(opponent, yours);
}
console.log(total);
