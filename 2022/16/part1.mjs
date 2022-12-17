import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const valves = new Map();

for (const line of lines) {
  const [valveInput, tunnelInput] = line.split(/; tunnels? leads? to valves? /);
  const [valveName, flowRate] = valveInput.split(' has flow rate=');

  const valve = valveName.replace('Valve ', '');
  valves.set(valve, {
    flowRate: Number(flowRate),
    tunnels: tunnelInput.split(', '),
  });
}

const valveDist = new Map([...valves.keys()].map((v) => [v, new Map()]));
const q = [...valves.keys()].map((v) => ({ current: v, from: v, time: 1 }));
while (q.length > 0) {
  const { current, from, time } = q.shift();

  const dists = valveDist.get(from);
  if (dists.has(current)) {
    continue;
  }
  dists.set(current, time);

  const { tunnels } = valves.get(current);
  for (const v of tunnels) {
    q.push({ current: v, from, time: time + 1 });
  }
}

let max = 0;
const bestPressure = new Map();
const nodes = [
  {
    flow: 0,
    pressure: 0,
    time: 30,
    valve: 'AA',
    visited: new Set(
      [...valves]
        .filter(([valve, { flowRate }]) => flowRate === 0)
        .map(([valve]) => valve)
    ),
  },
];
while (nodes.length > 0) {
  const { flow, pressure, time, valve, visited } = nodes.shift();

  const key = `${time}:${valve}`;
  if ((bestPressure.get(key) ?? 0) > pressure) {
    continue;
  }
  bestPressure.set(key, pressure);

  const { flowRate } = valves.get(valve);
  const newFlow = flow + flowRate;
  if (time === 0 || visited.size === valves.size) {
    const newPressure = pressure + newFlow * time;
    if (newPressure > max) {
      max = newPressure;
    }
    continue;
  }

  for (const [to, turnTime] of valveDist.get(valve)) {
    if (!visited.has(to)) {
      const timeUsed = Math.min(turnTime, time);
      nodes.push({
        flow: newFlow,
        pressure: pressure + newFlow * timeUsed,
        time: time - timeUsed,
        valve: to,
        visited: new Set(visited).add(to),
      });
    }
  }
}

console.log(max);
