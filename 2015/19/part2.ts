import { getInput } from '../utils.js';

const input = await getInput();
const [replacementsInput, molecule] = input.split('\n\n');

const replacements = new Map();
for (const replacement of replacementsInput!.split('\n')) {
  const [from, to] = replacement.split(' => ');
  if (!replacements.has(to)) {
    replacements.set(to, []);
  }
  replacements.get(to).push(from);
}

const q = [
  {
    molecule,
    steps: 0,
  },
];

const seen = new Map();

while (q.length > 0) {
  const { molecule, steps } = q.pop()!;
  if (steps >= seen.get(molecule) ?? Infinity) {
    continue;
  }

  seen.set(molecule, steps);
  if (molecule === 'e') {
    break;
  }

  for (let i = 0; i < molecule!.length; i++) {
    for (const [from, to] of replacements) {
      if (molecule!.startsWith(from, i)) {
        for (const replacement of to) {
          q.push({
            molecule:
              molecule!.slice(0, i) +
              molecule!.slice(i).replace(from, replacement),
            steps: steps + 1,
          });
        }
      }
    }
  }
}

console.log(seen.get('e'));
