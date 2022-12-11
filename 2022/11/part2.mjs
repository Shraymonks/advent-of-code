import { getInput } from '../utils.mjs';

class Monkey {
  inspections = 0;
  static mod = 1;

  constructor(monkeyInput) {
    const lines = monkeyInput.split('\n').map((line) => line.trim());
    // Index line
    lines.shift();

    this.items = lines
      .shift()
      .replace('Starting items: ', '')
      .split(', ')
      .map(Number);
    const [op, operandInput] = lines
      .shift()
      .replace('Operation: new = old ', '')
      .split(' ');

    const operand = Number(operandInput);
    switch (op) {
      case '*':
        if (operandInput === 'old') {
          this.inspect = (item) => item * item;
        } else {
          this.inspect = (item) => item * operand;
        }
        break;
      case '+':
        if (operandInput === 'old') {
          this.inspect = (item) => item + item;
        } else {
          this.inspect = (item) => item + operand;
        }
        break;
    }

    this.divisor = Number(lines.shift().replace('Test: divisible by ', ''));
    Monkey.mod *= this.divisor;
    this.trueMonkey = Number(
      lines.shift().replace('If true: throw to monkey ', '')
    );
    this.falseMonkey = Number(
      lines.shift().replace('If false: throw to monkey ', '')
    );
  }
  tossNext() {
    const worry = this.inspect(this.items.shift()) % Monkey.mod;
    this.inspections++;

    const monkeyIndex =
      worry % this.divisor === 0 ? this.trueMonkey : this.falseMonkey;
    monkeys[monkeyIndex].items.push(worry);
  }
  takeTurn() {
    while (this.items.length > 0) {
      this.tossNext();
    }
  }
}

const input = await getInput();
const monkeys = input
  .split('\n\n')
  .map((monkeyInput) => new Monkey(monkeyInput));

for (let i = 0; i < 10000; i++) {
  for (const monkey of monkeys) {
    monkey.takeTurn();
  }
}

const [mostActive, secondMostActive] = monkeys
  .map(({ inspections }) => inspections)
  .sort((a, b) => b - a);

console.log(mostActive * secondMostActive);
