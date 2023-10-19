import { getInput } from '../utils.js';
const { createHash } = await import('node:crypto');

const secret = await getInput();

let i = 1;
while (
  !createHash('md5').update(`${secret}${i}`).digest('hex').startsWith('00000')
) {
  i++;
}

console.log(i);
