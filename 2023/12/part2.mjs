import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

function numArrangements(
  row,
  groups,
  rowOffset = 0,
  groupsOffset = 0,
  cache = new Map()
) {
  const key = `${rowOffset},${groupsOffset}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  const isLastGroup = groups.length - groupsOffset === 1;
  const group = groups[groupsOffset];
  const firstRequired = row.indexOf('#', rowOffset);
  const lastRequired = row.lastIndexOf('#');

  const re = new RegExp(`[#?]{${group}}[.?]${isLastGroup ? '*$' : ''}`, 'g');
  re.lastIndex = rowOffset;
  let match = null;
  let arrangements = 0;

  while (
    (match = re.exec(row)) &&
    (firstRequired < 0 || match.index <= firstRequired) &&
    (!isLastGroup || lastRequired < 0 || match.index + group > lastRequired)
  ) {
    arrangements += isLastGroup
      ? 1
      : numArrangements(row, groups, re.lastIndex, groupsOffset + 1, cache);
    re.lastIndex = match.index + 1;
  }

  cache.set(key, arrangements);
  return arrangements;
}

let arrangements = 0;
for (const line of lines) {
  const [row, groupsString] = line.split(' ');
  const groups = groupsString.split(',').map(Number);

  let expandedRow = row;
  const expandedGroups = [...groups];
  for (let i = 0; i < 4; i++) {
    expandedRow += '?' + row;
    expandedGroups.push(...groups);
  }

  arrangements += numArrangements(expandedRow, expandedGroups);
}
console.log(arrangements);
