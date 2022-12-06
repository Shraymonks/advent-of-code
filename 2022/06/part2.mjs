import { getInput } from '../utils.mjs';

const input = await getInput();

const MESSAGE_SIZE = 14;
for (let i = 0; i < input.length; i++) {
  const markerIndex = i + MESSAGE_SIZE;
  const s = new Set([...input.slice(i, markerIndex)]);
  if (s.size === MESSAGE_SIZE) {
    console.log(markerIndex);
    break;
  }
}
