import { getInput } from '../utils.mjs';

const input = await getInput();

const blocks = [];
let nextFileID = 0;
for (let i = 0; i < input.length; i++) {
  const isFile = i % 2 === 0;
  const length = Number(input[i]);
  const id = isFile ? nextFileID : -1;
  for (let j = 0; j < length; j++) {
    blocks.push(id);
  }
  if (isFile) {
    nextFileID++;
  }
}

let sum = 0;
for (const i of blocks.keys()) {
  let id = blocks[i];
  while (id === -1) {
    id = blocks.pop();
  }
  sum += i * id;
}
console.log(sum);
