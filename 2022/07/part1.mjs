import { getInput } from '../utils.mjs';

const input = await getInput();
const lines = input.split('\n');

const dirSizes = new Map();
let path = [''];
for (const line of lines) {
  if (line[0] === '$') {
    const [$, cmd, arg] = line.split(' ');

    switch (cmd) {
      case 'cd':
        switch (arg) {
          case '..':
            path.pop();
            break;
          case '/':
            path = [''];
            break;
          default:
            path.push(arg);
        }
        break;
    }
  } else {
    // ls
    const [size, name] = line.split(' ');
    if (size !== 'dir') {
      for (let i = 1; i <= path.length; i++) {
        const dirPath = path.slice(0, i).join('/');
        dirSizes.set(dirPath, (dirSizes.get(dirPath) ?? 0) + Number(size));
      }
    }
  }
}

console.log(
  [...dirSizes.values()]
    .filter((size) => size <= 100000)
    .reduce((sum, size) => sum + size)
);
