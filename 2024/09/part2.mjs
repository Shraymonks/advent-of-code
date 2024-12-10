import { getInput } from '../utils.mjs';

const input = await getInput();

const contiguousBlocks = [];
let nextFileID = 0;
for (let i = 0; i < input.length; i++) {
  const isFile = i % 2 === 0;
  const length = Number(input[i]);
  const id = isFile ? nextFileID : -1;
  if (length > 0) {
    contiguousBlocks.push({ id, length });
  }
  if (isFile) {
    nextFileID++;
  }
}

for (let moveFileID = nextFileID; moveFileID >= 0; moveFileID--) {
  const fileIndex = contiguousBlocks.findIndex(({ id }) => id === moveFileID);
  const file = contiguousBlocks[fileIndex];
  const spaceIndex = contiguousBlocks.findIndex(
    ({ id, length }, i) => i < fileIndex && id < 0 && length >= file.length,
  );
  if (spaceIndex < 0) {
    continue;
  }
  const beforeSpace = contiguousBlocks[fileIndex - 1].id < 0;
  const afterSpace =
    contiguousBlocks[fileIndex + 1] != null &&
    contiguousBlocks[fileIndex + 1].id < 0;
  let length = file.length;
  let deleteCount = 1;
  let startIndex = fileIndex;
  if (beforeSpace) {
    length += contiguousBlocks[fileIndex - 1].length;
    deleteCount++;
    startIndex--;
  }
  if (afterSpace) {
    length += contiguousBlocks[fileIndex + 1].length;
    deleteCount++;
  }
  contiguousBlocks.splice(startIndex, deleteCount, { id: -1, length });

  if (file.length < contiguousBlocks[spaceIndex].length) {
    contiguousBlocks[spaceIndex].length -= file.length;
    contiguousBlocks.splice(spaceIndex, 0, file);
  } else {
    contiguousBlocks.splice(spaceIndex, 1, file);
  }
}

let sum = 0;
let i = 0;
for (const { id, length } of contiguousBlocks) {
  if (id > 0) {
    sum += (length * id * (i + i + length - 1)) / 2;
  }
  i += length;
}
console.log(sum);
