import { getInput } from '../utils.js';

const input = await getInput();

type Gate = 'NOT' | 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT';
type Wire =
  | {
      gate: 'NOT';
      output: string;
    }
  | {
      gate: 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT';
      input: string;
      output: string;
    };

function solve(input: string) {
  const circuits = input.split('\n');

  const wires = new Map();
  const waiting = new Map<string, Wire[]>();

  function process(wire: string): void {
    if (!waiting.has(wire)) {
      return;
    }
    const q = waiting.get(wire) ?? [];

    const remaining = q.filter((w) => {
      if (wires.has(w.output)) {
        return false;
      }

      if (w.gate === 'NOT') {
        if (!wires.has(wire)) {
          return true;
        }
        wires.set(w.output, ~wires.get(wire) & 0xffff);
        process(w.output);
        return false;
      }

      const { gate, input, output } = w;

      const leftSignal = getSignal(wire);
      const rightSignal = getSignal(input);

      if (typeof leftSignal === 'number' && typeof rightSignal === 'number') {
        let result;
        switch (gate) {
          case 'AND':
            result = leftSignal & rightSignal;
            break;
          case 'OR':
            result = leftSignal | rightSignal;
            break;
          case 'LSHIFT':
            result = leftSignal << rightSignal;
            break;
          case 'RSHIFT':
            result = leftSignal >> rightSignal;
            break;
        }
        wires.set(output, result);
        process(output);
        return false;
      }
      return true;
    });

    if (remaining.length === 0) {
      waiting.delete(wire);
    } else {
      waiting.set(wire, remaining);
    }
  }

  function getSignal(wire: string): number | string {
    const signal = Number(wire);
    if (!Number.isNaN(signal)) {
      return signal;
    }
    if (wires.has(wire)) {
      return wires.get(wire);
    }
    return wire;
  }

  for (const circuit of circuits) {
    const [inputs, output] = circuit.split(' -> ') as [string, string];

    const signal = Number(inputs);

    if (!Number.isNaN(signal)) {
      wires.set(output, signal);
      process(output);
      continue;
    }

    if (inputs.startsWith('NOT')) {
      const inputWire = inputs.substring('NOT '.length);
      if (!waiting.has(inputWire)) {
        waiting.set(inputWire, []);
      }
      waiting.get(inputWire)!.push({
        gate: 'NOT',
        output,
      });
      process(inputWire);
      continue;
    }

    const [leftInput, gate, rightInput] = inputs.split(' ') as [
      string,
      Gate,
      string
    ];

    if (Number.isNaN(Number(leftInput))) {
      if (!waiting.has(leftInput)) {
        waiting.set(leftInput, []);
      }
      waiting.get(leftInput)!.push({
        gate,
        input: rightInput,
        output,
      });
      process(leftInput);
    }
    if (Number.isNaN(Number(rightInput))) {
      if (!waiting.has(rightInput)) {
        waiting.set(rightInput, []);
      }
      waiting.get(rightInput)!.push({
        gate,
        input: leftInput,
        output,
      });
      process(rightInput);
    }
  }
  return {
    a: wires.get('lx'),
    b: wires.get('b'),
  };
}

const { a, b } = solve(input);
const newInput = input.replace(b, a);
console.log(solve(newInput).a);
