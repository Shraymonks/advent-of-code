import { getInput } from '../utils.mjs';

const input = await getInput();
const blueprintsInput = input.split('\n');

let blueprints = new Map();

for (const blueprint of blueprintsInput) {
  const [index, robotsInput] = blueprint.split(': ');
  const robots = robotsInput.slice(0, -1).split('. ');
  const robotCosts = new Map();
  for (const robot of robots) {
    const [type, costsInput] = robot
      .replace('Each ', '')
      .split(' robot costs ');
    const costs = costsInput.split(' and ');
    const resourceCosts = new Map();
    for (const cost of costs) {
      const [amount, unit] = cost.split(' ');
      resourceCosts.set(unit, Number(amount));
    }
    robotCosts.set(type, resourceCosts);
  }
  blueprints.set(Number(index.replace('Blueprint ', '')), robotCosts);
}

blueprints = new Map([...blueprints].slice(0, 3));

const maxGeodes = new Map();

for (const [ID, blueprint] of blueprints) {
  const q = [
    {
      resources: new Map([
        ['ore', 0],
        ['clay', 0],
        ['obsidian', 0],
        ['geode', 0],
      ]),
      robots: new Map([
        ['ore', 1],
        ['clay', 0],
        ['obsidian', 0],
        ['geode', 0],
      ]),
      time: 32,
    },
  ];

  const maxBotsNeeded = new Map();
  for (const [robotType, costs] of blueprint) {
    for (const [resourceType, amount] of costs) {
      maxBotsNeeded.set(
        resourceType,
        Math.max(maxBotsNeeded.get(resourceType) ?? 0, amount)
      );
    }
  }

  while (q.length > 0) {
    const { resources, robots, time } = q.pop();

    maxGeodes.set(ID, Math.max(maxGeodes.get(ID) ?? 0, resources.get('geode')));

    if (time <= 0) {
      continue;
    }

    for (const [robotType, costs] of blueprint) {
      if (robots.get(robotType) >= maxBotsNeeded.get(robotType)) {
        continue;
      }
      if (
        [...costs].findIndex(
          ([resourceType]) => robots.get(resourceType) === 0
        ) >= 0
      ) {
        continue;
      }

      const resourceCollectTime = [];
      for (const [resourceType, amount] of costs) {
        const numResources = resources.get(resourceType);
        if (numResources >= amount) {
          resourceCollectTime.push(1);
        } else {
          resourceCollectTime.push(
            Math.ceil((amount - numResources) / robots.get(resourceType)) + 1
          );
        }
      }
      const timeToBuild = Math.max(...resourceCollectTime);

      const newResources = new Map(resources);
      for (const [robotType, amount] of robots) {
        newResources.set(
          robotType,
          newResources.get(robotType) + amount * Math.min(timeToBuild, time)
        );
      }
      if (timeToBuild > time) {
        q.push({
          resources: newResources,
          robots,
          time: 0,
        });
        continue;
      }

      for (const [resourceType, amount] of costs) {
        newResources.set(resourceType, newResources.get(resourceType) - amount);
      }
      const newRobots = new Map(robots);
      newRobots.set(robotType, newRobots.get(robotType) + 1);
      q.push({
        resources: newResources,
        robots: newRobots,
        time: time - timeToBuild,
      });
    }
  }
}

let product = 1;
for (const [ID, geodes] of maxGeodes) {
  product *= geodes;
}
console.log(product);
