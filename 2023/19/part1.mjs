import { getInput } from '../utils.mjs';

const input = await getInput();
const [workflowsInput, partsInput] = input.split('\n\n');

class Workflow {
  static #instances = new Map();
  #rules;
  constructor(rules) {
    this.#rules = rules;
  }

  static #accept(ratings) {
    let sum = 0;
    for (const rating of ratings.values()) {
      sum += rating;
    }
    return sum;
  }

  static #compare(condition, ratings) {
    if (condition == null) {
      return true;
    }
    const { comparison, part, value } = condition;
    const partValue = ratings.get(part);
    switch (comparison) {
      case '<':
        return partValue < value;
      case '>':
        return partValue > value;
    }
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

  static runWorkflows(ratings) {
    return Workflow.#instances.get('in').run(ratings);
  }

  run(ratings) {
    for (const { condition, destination } of this.#rules) {
      const passed = Workflow.#compare(condition, ratings);
      if (passed) {
        return Workflow.#getResult(destination, ratings);
      }
    }
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

let total = 0;
for (const partlist of partsInput.split('\n')) {
  const ratings = new Map();
  const parts = partlist.slice(1, -1).split(',');
  for (const part of parts) {
    const [name, rating] = part.split('=');
    ratings.set(name, Number(rating));
  }
  total += Workflow.runWorkflows(ratings);
}
console.log(total);
