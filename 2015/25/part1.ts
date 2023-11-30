import { getInput } from '../utils.js';

const input = await getInput();
const [, rowString, colString] = input.match(
  /To continue, please consult the code grid in the manual.  Enter the code at row (.+), column (.+)./
)!;

const [row, col] = [rowString, colString].map(Number) as [number, number];

function getN(row: number, col: number): number {
  return ((col - 1) * (row + row + col)) / 2 + (row * (row - 1)) / 2 + 1;
}

const n = getN(row, col);

let code = 20151125;
for (let i = 1; i < n; i++) {
  code = (code * 252533) % 33554393;
}

console.log(code);
