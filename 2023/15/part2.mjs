import { getInput } from '../utils.mjs';

const input = await getInput();
const sequence = input.split(',');

function hash(step) {
  let value = 0;
  for (const c of step) {
    value += c.charCodeAt(0);
    value *= 17;
    value %= 256;
  }
  return value;
}

const boxes = new Map();
for (const step of sequence) {
  const [label, length] = step.split(/-|=/);
  const boxNumber = hash(label);
  const operation = step[label.length];

  if (!boxes.has(boxNumber)) {
    boxes.set(boxNumber, new Map());
  }
  const box = boxes.get(boxNumber);

  switch (operation) {
    case '-':
      box.delete(label);
      break;
    case '=':
      box.set(label, Number(length));
      break;
  }
}

let sum = 0;
for (const [box, lenses] of boxes) {
  for (const [slot, [, length]] of [...lenses].entries()) {
    sum += (box + 1) * (slot + 1) * length;
  }
}
console.log(sum);
