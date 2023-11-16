import { getInput } from '../utils.js';

const input = await getInput();

function isValid(password: string): boolean {
  const letters = new Set(password);

  if (letters.has('i') || letters.has('o') || letters.has('l')) {
    return false;
  }

  let lastCharCode = 0;
  let increasingCount = 1;
  let hasIncreasing = false;
  for (const char of password) {
    const charCode = char.charCodeAt(0);
    if (charCode === lastCharCode + 1) {
      increasingCount++;
      if (increasingCount === 3) {
        hasIncreasing = true;
        break;
      }
    } else {
      increasingCount = 1;
    }
    lastCharCode = charCode;
  }
  if (!hasIncreasing) {
    return false;
  }

  let hasPairs = false;
  let pair = '';
  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      if (pair === '') {
        pair = password[i]!.repeat(2);
      } else if (password[i] !== pair[0]) {
        hasPairs = true;
        break;
      }
    }
  }

  return hasPairs;
}

function getNext(password: string): string {
  const chars = password.split('');
  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i]!;
    const charCode = char.charCodeAt(0);
    if (char === 'z') {
      chars[i] = 'a';
    } else {
      chars[i] = String.fromCharCode(charCode + 1);
      return chars.join('');
    }
  }
  return 'a' + chars.join('');
}

let next = input;
while (!isValid(next)) {
  next = getNext(next);
}
next = getNext(next);
while (!isValid(next)) {
  next = getNext(next);
}
console.log(next);
