import { PriorityQueue } from 'js-sdsl';
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
const nodes = new PriorityQueue(
  [
    {
      currentValves: [
        { timeLeft: 0, valve: 'AA' },
        { timeLeft: 0, valve: 'AA' },
      ],
      flow: 0,
      pressure: 0,
      time: 26,
      visited: new Set(
        [...valves]
          .filter(([valve, { flowRate }]) => flowRate === 0)
          .map(([valve]) => valve)
      ),
    },
  ],
  (a, b) => b.pressure - a.pressure
);
while (nodes.length > 0) {
  const { currentValves, flow, pressure, time, visited } = nodes.pop();

  const key = `${time}:${[...visited].sort()}`;
  if ((bestPressure.get(key) ?? 0) > pressure) {
    continue;
  }
  bestPressure.set(key, pressure);

  const flowRates = currentValves
    .filter(({ timeLeft }) => timeLeft === 0)
    .map(({ valve }) => valves.get(valve).flowRate);
  const newFlow = flow + flowRates.reduce((total, rate) => total + rate);
  if (time === 0 || visited.size === valves.size) {
    let newPressure = pressure;
    for (const { timeLeft, valve } of currentValves) {
      newPressure += Math.max(time - timeLeft, 0) * valves.get(valve).flowRate;
    }
    newPressure += flow * time;
    if (newPressure > max) {
      max = newPressure;
    }
    continue;
  }

  if (currentValves[0].timeLeft === currentValves[1].timeLeft) {
    const unvisited = [...valveDist.get(currentValves[0].valve)].filter(
      ([v]) => !visited.has(v)
    );
    const unvisited2 = [...valveDist.get(currentValves[1].valve)].filter(
      ([v]) => !visited.has(v)
    );
    for (let i = 0; i < unvisited.length; i++) {
      const [v1, turnTime1] = unvisited[i];
      const timeUsed1 = Math.min(turnTime1, time);

      if (unvisited2.length > 1) {
        for (let j = 0; j < unvisited2.length; j++) {
          const [v2, turnTime2] = unvisited2[j];
          if (v2 === v1) {
            continue;
          }
          const timeUsed2 = Math.min(turnTime2, time);

          const minTime = Math.min(timeUsed1, timeUsed2);
          const timeLeft1 = timeUsed1 - minTime;
          const timeLeft2 = timeUsed2 - minTime;
          nodes.push({
            currentValves: [
              { valve: v1, timeLeft: timeLeft1 },
              { valve: v2, timeLeft: timeLeft2 },
            ],
            flow: newFlow,
            pressure: pressure + newFlow * minTime,
            time: time - minTime,
            visited: new Set(visited).add(v1).add(v2),
          });
        }
      } else {
        nodes.push({
          currentValves: [
            { valve: v1, timeLeft: timeUsed1 },
            { valve: 'AA', timeLeft: 0 },
          ],
          flow: newFlow,
          pressure: pressure + newFlow * timeUsed1,
          time: time - timeUsed1,
          visited: new Set(visited).add(v1),
        });
      }
    }
  } else {
    const valve =
      currentValves[0].timeLeft === 0
        ? currentValves[0].valve
        : currentValves[1].valve;
    for (const [to, turnTime] of valveDist.get(valve)) {
      if (!visited.has(to)) {
        const timeUsed1 = Math.min(turnTime, time);
        const timeUsed2 = Math.min(
          Math.max(currentValves[0].timeLeft, currentValves[1].timeLeft),
          time
        );
        const minTime = Math.min(timeUsed1, timeUsed2);
        const timeLeft1 = timeUsed1 - minTime;
        const timeLeft2 = timeUsed2 - minTime;
        const secondValve =
          currentValves[0].timeLeft === 0
            ? currentValves[1].valve
            : currentValves[0].valve;
        nodes.push({
          currentValves: [
            { valve: to, timeLeft: timeLeft1 },
            { valve: secondValve, timeLeft: timeLeft2 },
          ],
          flow: newFlow,
          pressure: pressure + newFlow * minTime,
          time: time - minTime,
          visited: new Set(visited).add(to).add(secondValve),
        });
      }
    }
  }
}

console.log(max);
