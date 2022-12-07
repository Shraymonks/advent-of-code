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

const TOTAL_DISK_SPACE = 70000000;
const UPDATE_REQUIRED_SPACE = 30000000;
const spaceNeeded = UPDATE_REQUIRED_SPACE - TOTAL_DISK_SPACE + dirSizes.get('');
console.log(
  [...dirSizes.values()]
    .sort((a, b) => a - b)
    .find((size) => size >= spaceNeeded)
);
