import { getInput } from '../utils.mjs';

const input = await getInput();
const [workflowsInput] = input.split('\n\n');

class Workflow {
  static #INITIAL_RANGE = new Map([
    ['x', [1, 4000]],
    ['m', [1, 4000]],
    ['a', [1, 4000]],
    ['s', [1, 4000]],
  ]);
  static #instances = new Map();
  #rules;
  constructor(rules) {
    this.#rules = rules;
  }

  static #accept(ratings) {
    let total = 1;
    for (const [min, max] of ratings.values()) {
      total *= max - min + 1;
    }
    return total;
  }

  static #compare(condition, ratings) {
    if (condition == null) {
      return { passRatings: ratings };
    }
    const { comparison, part, value } = condition;
    const failRatings = structuredClone(ratings);
    const passRatings = structuredClone(ratings);
    const failPart = failRatings.get(part);
    const passPart = passRatings.get(part);
    const [min, max] = ratings.get(part);
    const newMin = Math.max(min, value);
    const newMax = Math.min(max, value);

    switch (comparison) {
      case '<':
        failPart[0] = newMin;
        passPart[1] = newMax - 1;
        break;
      case '>':
        failPart[1] = newMax;
        passPart[0] = newMin + 1;
        break;
    }
    return { failRatings, passRatings };
  }

  static #getResult(destination, ratings) {
    switch (destination) {
      case 'A':
        return Workflow.#accept(ratings);
      case 'R':
        return 0;
    }
    return Workflow.#instances.get(destination).run(ratings);
  }

  static add(name, rules) {
    const workflow = new Workflow(rules);
    Workflow.#instances.set(name, workflow);
    return workflow;
  }

  static runWorkflows() {
    return Workflow.#instances.get('in').run();
  }

  run(ratings = Workflow.#INITIAL_RANGE) {
    let currentRatings = ratings;
    let combinations = 0;
    for (const { condition, destination } of this.#rules) {
      const { failRatings, passRatings } = Workflow.#compare(
        condition,
        currentRatings
      );
      combinations += Workflow.#getResult(destination, passRatings);
      currentRatings = failRatings;
    }
    return combinations;
  }
}

for (const workflow of workflowsInput.split('\n')) {
  const [, name, rulesInput] = workflow.match(/(.+)\{(.+)\}/);

  const rules = [];
  for (const rule of rulesInput.split(',')) {
    const [condition, destination] = rule.split(':');

    if (destination == null) {
      rules.push({ destination: condition });
    } else {
      const [, part, comparison, val] = condition.match(/(\w+)(<|>)(\d+)/);
      const value = Number(val);

      rules.push({
        condition: { comparison, part, value },
        destination,
      });
    }
  }
  Workflow.add(name, rules);
}
console.log(Workflow.runWorkflows());
