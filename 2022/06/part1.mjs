import { getInput } from '../utils.mjs';

const input = await getInput();

const PACKET_SIZE = 4;
for (let i = 0; i < input.length; i++) {
  const markerIndex = i + PACKET_SIZE;
  const s = new Set([...input.slice(i, markerIndex)]);
  if (s.size === PACKET_SIZE) {
    console.log(markerIndex);
    break;
  }
}
