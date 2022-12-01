import { open } from 'node:fs/promises';

export async function getInput() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    throw new Error('No input path provided.');
  }
  const file = await open(inputPath);
  const input = await file.readFile({ encoding: 'utf8' });
  file.close();
  return input.trim();
}
