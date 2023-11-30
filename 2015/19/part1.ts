import { getInput } from '../utils.js';

const input = await getInput();
const [replacementsInput, molecule] = input.split('\n\n');

const replacements = new Map();
for (const replacement of replacementsInput!.split('\n')) {
  const [from, to] = replacement.split(' => ');
  if (!replacements.has(from)) {
    replacements.set(from, []);
  }
  replacements.get(from).push(to);
}

const newMolecules = new Set();

for (let i = 0; i < molecule!.length; i++) {
  for (const [from, to] of replacements) {
    if (molecule!.startsWith(from, i)) {
      for (const replacement of to) {
        newMolecules.add(
          molecule!.slice(0, i) + molecule!.slice(i).replace(from, replacement)
        );
      }
    }
  }
}

console.log(newMolecules.size);
