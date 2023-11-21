import { getInput } from '../utils.js';

const input = await getInput();
const lines = input.split('\n');

const deerDistances = lines.map((line) => {
  const [, speedString, enduranceString, restString] = line.match(
    /.+ can fly (.+) km\/s for (.+) seconds, but then must rest for (.+) seconds\./
  )!;

  const speed = Number(speedString);
  const endurance = Number(enduranceString);
  const rest = Number(restString);
  const cycleLength = endurance + rest;

  return (time: number) => {
    const cycles = Math.floor(time / cycleLength);
    return (
      (cycles * endurance + Math.min(time % cycleLength, endurance)) * speed
    );
  };
});

console.log(Math.max(...deerDistances.map((f) => f(2503))));
