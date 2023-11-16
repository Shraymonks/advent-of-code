import { getInput } from '../utils.js';

type Json =
  | number
  | string
  | Json[]
  | {
      [key: string]: Json;
    };

const input = await getInput();
const json = JSON.parse(input);

function sumList(list: Json[]): number {
  return list.reduce((sum: number, item) => addNumbers(item) + sum, 0);
}

function addNumbers(obj: Json): number {
  if (typeof obj === 'number') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return sumList(obj);
  }
  if (typeof obj === 'object') {
    return sumList(Object.values(obj));
  }
  return 0;
}

console.log(addNumbers(json));
