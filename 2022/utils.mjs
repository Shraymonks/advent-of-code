import { readFile } from 'node:fs/promises';

export async function getInput() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    throw new Error('No input path provided.');
  }
  const input = await readFile(inputPath, { encoding: 'utf8' });
  return input.trimEnd();
}
