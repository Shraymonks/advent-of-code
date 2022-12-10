import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

let X = 1;
let cycle = 0;
let output = '';

function drawPixel() {
  cycle++;
  const currentPixel = (cycle - 1) % 40;
  output += Math.abs(X - currentPixel) <= 1 ? '#' : '.';
  if (cycle % 40 === 0) {
    output += '\n';
  }
}

for (const line of lines) {
  const [cmd, V] = line.split(' ');

  switch (cmd) {
    case 'noop':
      drawPixel();
      break;
    case 'addx':
      drawPixel();
      drawPixel();
      break;
  }

  X += Number(V) || 0;
}

console.log(output);
