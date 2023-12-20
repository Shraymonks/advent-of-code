import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

class Module {
  static #instances = new Map();
  static #inputMap = new Map();
  static highSent = 0;
  static lowSent = 0;

  constructor(name, outputs) {
    this.name = name;
    this.inputs = Module.#inputMap.get(name) ?? new Set();
    this.outputs = new Set(outputs);
  }

  handlePulse(pulse) {
    this.sendPulse(pulse);
  }

  sendPulse(pulse) {
    for (const to of this.outputs) {
      Module.#instances.get(to)?.handlePulse(pulse, this.name);
    }
    if (pulse) {
      Module.highSent += this.outputs.size;
    } else {
      Module.lowSent += this.outputs.size;
    }
  }

  addInput(name) {
    this.inputs.add(name);
  }

  static add(name, outputs) {
    for (const output of outputs) {
      if (!Module.#inputMap.has(output)) {
        Module.#inputMap.set(output, new Set());
      }
      Module.#inputMap.get(output).add(name);

      if (Module.#instances.has(output)) {
        Module.#instances.get(output).addInput(name);
      }
    }
    const module = new this(name, outputs);
    Module.#instances.set(name, module);
    return module;
  }

  static pushButton() {
    Module.lowSent++;
    Module.#instances.get('broadcaster').handlePulse(false);
  }
}

class Conjunction extends Module {
  #memory = new Map();
  #numOff = this.inputs.size;

  handlePulse(pulse, from) {
    const prevMemory = this.#memory.get(from);
    this.#memory.set(from, pulse);
    if (pulse !== prevMemory) {
      this.#numOff += pulse ? -1 : 1;
    }
    this.sendPulse(this.#numOff > 0);
  }

  addInput(name) {
    super.addInput(name);
    this.#memory.set(name, false);
    this.#numOff++;
  }
}

class FlipFlop extends Module {
  #on = false;

  handlePulse(pulse) {
    if (!pulse) {
      this.#on = !this.#on;
      this.sendPulse(this.#on);
    }
  }
}

for (const line of lines) {
  const [nameInput, destinationsInput] = line.split(' -> ');
  const outputs = destinationsInput.split(', ');
  const type = nameInput[0];
  const name = nameInput.slice(1);

  switch (type) {
    case '%':
      FlipFlop.add(name, outputs);
      break;
    case '&':
      Conjunction.add(name, outputs);
      break;
    case 'b':
      Module.add(nameInput, outputs);
      break;
  }
}

for (let press = 0; press < 1000; press++) {
  Module.pushButton();
}
console.log(Module.lowSent * Module.highSent);
