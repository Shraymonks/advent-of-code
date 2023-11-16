import { getInput } from '../utils.js';

const input = await getInput();
const pairs = input.split('\n');

const distances = new Map();
const maxDistances = new Map();
const locations = new Set<string>();
let max = 0;

function key(locations: string[]): string {
  return locations.sort().toString();
}

for (const pair of pairs) {
  const [, l1, l2, dString] = pair.match(/(.+) to (.+) = (.+)/)!;
  const d = Number(dString);

  locations.add(l1!).add(l2!);
  distances.set(key([l1!, l2!]), d);
}

interface Node {
  distance: number;
  visited: Set<string>;
}

const q: Node[] = [...locations].map((l) => ({
  distance: 0,
  visited: new Set([l]),
}));

function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

while (q.length > 0) {
  const { distance, visited } = q.pop()!;

  const visitedList = [...visited];
  const first = visitedList[0]!;
  const last = visitedList.at(-1)!;
  const k = `${first}:${last}:${key(visitedList)}`;

  if (distance <= maxDistances.get(k) ?? 0) {
    continue;
  }
  maxDistances.set(k, distance);

  const toVisit = difference(locations, visited);
  if (toVisit.size === 0) {
    max = Math.max(max, distance);
  }

  for (const l of toVisit) {
    const newDistance = distance + distances.get(key([last, l]));
    q.push({
      distance: newDistance,
      visited: new Set(visited).add(l),
    });
  }
}

console.log(max);
