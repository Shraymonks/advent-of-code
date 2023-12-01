import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const NUMBER_MAP = new Map([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
]);

let sum = 0;
for (const line of lines) {
  const re = /\d|one|two|three|four|five|six|seven|eight|nine/g;
  const matches = [];
  let match;
  while ((match = re.exec(line))) {
    matches.push(match[0]);
    // Account for overlapping matches
    re.lastIndex = match.index + 1;
  }
  const first = matches[0];
  const last = matches.at(-1);
  const [f, l] = [first, last].map((d) => NUMBER_MAP.get(d) ?? d);
  sum += Number(f + l);
}

console.log(sum);
