import { getInput } from '../utils.mjs';

const CUBE_SIZE = 50;

const input = await getInput();
const [boardInput, path] = input.split('\n\n');
const rowsInput = boardInput.split('\n');

const offsets = [
  [1, 0],
  [2, 0],
  [1, 1],
  [0, 2],
  [1, 2],
  [0, 3],
];

const cubeRows = [];
const cubeCols = [];

for (let i = 0; i < offsets.length; i++) {
  const [xOffset, yOffset] = offsets[i];
  const xStart = xOffset * CUBE_SIZE;
  const xEnd = xStart + CUBE_SIZE;
  const yStart = yOffset * CUBE_SIZE;
  const yEnd = yStart + CUBE_SIZE;

  const rows = [];
  for (let y = yStart; y < yEnd; y++) {
    const row = [];
    for (let x = xStart; x < xEnd; x++) {
      row.push({
        currentCube: i,
        x,
        y,
        type: rowsInput[y][x],
      });
    }
    rows.push(row);
  }
  cubeRows.push(rows);

  const cols = [];
  for (let x = xStart; x < xEnd; x++) {
    const col = [];
    for (let y = yStart; y < yEnd; y++) {
      col.push({
        currentCube: i,
        x,
        y,
        type: rowsInput[y][x],
      });
    }
    cols.push(col);
  }
  cubeCols.push(cols);
}

let currentCube = 0;
let cubeX = 0;
let cubeY = 0;
let x = cubeRows[currentCube][cubeY][cubeX].x;
let y = 0;
let dir = 0;

const edgeMap = new Map([
  [
    '0:0',
    {
      currentCube: 1,
      cubeX: (prevX, prevY) => 0,
      cubeY: (prevX, prevY) => prevY,
      dir: 0,
    },
  ],
  [
    '0:1',
    {
      currentCube: 2,
      cubeX: (prevX, prevY) => prevX,
      cubeY: (prevX, prevY) => 0,
      dir: 1,
    },
  ],
  [
    '0:2',
    {
      currentCube: 3,
      cubeX: (prevX, prevY) => 0,
      cubeY: (prevX, prevY) => CUBE_SIZE - prevY - 1,
      dir: 0,
    },
  ],
  [
    '0:3',
    {
      currentCube: 5,
      cubeX: (prevX, prevY) => 0,
      cubeY: (prevX, prevY) => prevX,
      dir: 0,
    },
  ],
  [
    '1:0',
    {
      currentCube: 4,
      cubeX: (prevX, prevY) => CUBE_SIZE - 1,
      cubeY: (prevX, prevY) => CUBE_SIZE - prevY - 1,
      dir: 2,
    },
  ],
  [
    '1:1',
    {
      currentCube: 2,
      cubeX: (prevX, prevY) => CUBE_SIZE - 1,
      cubeY: (prevX, prevY) => prevX,
      dir: 2,
    },
  ],
  [
    '1:2',
    {
      currentCube: 0,
      cubeX: (prevX, prevY) => CUBE_SIZE - 1,
      cubeY: (prevX, prevY) => prevY,
      dir: 2,
    },
  ],
  [
    '1:3',
    {
      currentCube: 5,
      cubeX: (prevX, prevY) => prevX,
      cubeY: (prevX, prevY) => CUBE_SIZE - 1,
      dir: 3,
    },
  ],
  [
    '2:0',
    {
      currentCube: 1,
      cubeX: (prevX, prevY) => prevY,
      cubeY: (prevX, prevY) => CUBE_SIZE - 1,
      dir: 3,
    },
  ],
  [
    '2:1',
    {
      currentCube: 4,
      cubeX: (prevX, prevY) => prevX,
      cubeY: (prevX, prevY) => 0,
      dir: 1,
    },
  ],
  [
    '2:2',
    {
      currentCube: 3,
      cubeX: (prevX, prevY) => prevY,
      cubeY: (prevX, prevY) => 0,
      dir: 1,
    },
  ],
  [
    '2:3',
    {
      currentCube: 0,
      cubeX: (prevX, prevY) => prevX,
      cubeY: (prevX, prevY) => CUBE_SIZE - 1,
      dir: 3,
    },
  ],
  [
    '3:0',
    {
      currentCube: 4,
      cubeX: (prevX, prevY) => 0,
      cubeY: (prevX, prevY) => prevY,
      dir: 0,
    },
  ],
  [
    '3:1',
    {
      currentCube: 5,
      cubeX: (prevX, prevY) => prevX,
      cubeY: (prevX, prevY) => 0,
      dir: 1,
    },
  ],
  [
    '3:2',
    {
      currentCube: 0,
      cubeX: (prevX, prevY) => 0,
      cubeY: (prevX, prevY) => CUBE_SIZE - prevY - 1,
      dir: 0,
    },
  ],
  [
    '3:3',
    {
      currentCube: 2,
      cubeX: (prevX, prevY) => 0,
      cubeY: (prevX, prevY) => prevX,
      dir: 0,
    },
  ],
  [
    '4:0',
    {
      currentCube: 1,
      cubeX: (prevX, prevY) => CUBE_SIZE - 1,
      cubeY: (prevX, prevY) => CUBE_SIZE - prevY - 1,
      dir: 2,
    },
  ],
  [
    '4:1',
    {
      currentCube: 5,
      cubeX: (prevX, prevY) => CUBE_SIZE - 1,
      cubeY: (prevX, prevY) => prevX,
      dir: 2,
    },
  ],
  [
    '4:2',
    {
      currentCube: 3,
      cubeX: (prevX, prevY) => CUBE_SIZE - 1,
      cubeY: (prevX, prevY) => prevY,
      dir: 2,
    },
  ],
  [
    '4:3',
    {
      currentCube: 2,
      cubeX: (prevX, prevY) => prevX,
      cubeY: (prevX, prevY) => CUBE_SIZE - 1,
      dir: 3,
    },
  ],
  [
    '5:0',
    {
      currentCube: 4,
      cubeX: (prevX, prevY) => prevY,
      cubeY: (prevX, prevY) => CUBE_SIZE - 1,
      dir: 3,
    },
  ],
  [
    '5:1',
    {
      currentCube: 1,
      cubeX: (prevX, prevY) => prevX,
      cubeY: (prevX, prevY) => 0,
      dir: 1,
    },
  ],
  [
    '5:2',
    {
      currentCube: 0,
      cubeX: (prevX, prevY) => prevY,
      cubeY: (prevX, prevY) => 0,
      dir: 1,
    },
  ],
  [
    '5:3',
    {
      currentCube: 3,
      cubeX: (prevX, prevY) => prevX,
      cubeY: (prevX, prevY) => CUBE_SIZE - 1,
      dir: 3,
    },
  ],
]);

function turn(clockwise) {
  dir = (dir + (clockwise ? 1 : -1) + 4) % 4;
}

function nextTile() {
  const rows = cubeRows[currentCube];
  const cols = cubeCols[currentCube];
  const row = rows[cubeY];
  const col = cols[cubeX];
  switch (dir) {
    case 0: {
      if (cubeX + 1 < row.length) {
        return {
          ...row[cubeX + 1],
          cubeX: cubeX + 1,
          cubeY,
          dir,
        };
      }
      const next = edgeMap.get(`${currentCube}:${dir}`);
      const nextCubeX = next.cubeX(cubeX, cubeY);
      const nextCubeY = next.cubeY(cubeX, cubeY);
      return {
        ...cubeRows[next.currentCube][nextCubeY][nextCubeX],
        cubeX: nextCubeX,
        cubeY: nextCubeY,
        dir: next.dir,
      };
    }
    case 1: {
      if (cubeY + 1 < col.length) {
        return {
          ...col[cubeY + 1],
          cubeX,
          cubeY: cubeY + 1,
          dir,
        };
      }
      const next = edgeMap.get(`${currentCube}:${dir}`);
      const nextCubeX = next.cubeX(cubeX, cubeY);
      const nextCubeY = next.cubeY(cubeX, cubeY);
      return {
        ...cubeCols[next.currentCube][nextCubeX][nextCubeY],
        cubeX: nextCubeX,
        cubeY: nextCubeY,
        dir: next.dir,
      };
    }
    case 2: {
      if (cubeX > 0) {
        return {
          ...row[cubeX - 1],
          cubeX: cubeX - 1,
          cubeY,
          dir,
        };
      }
      const next = edgeMap.get(`${currentCube}:${dir}`);
      const nextCubeX = next.cubeX(cubeX, cubeY);
      const nextCubeY = next.cubeY(cubeX, cubeY);
      return {
        ...cubeRows[next.currentCube][nextCubeY][nextCubeX],
        cubeX: nextCubeX,
        cubeY: nextCubeY,
        dir: next.dir,
      };
    }
    case 3: {
      if (cubeY > 0) {
        return {
          ...col[cubeY - 1],
          cubeX,
          cubeY: cubeY - 1,
          dir,
        };
      }
      const next = edgeMap.get(`${currentCube}:${dir}`);
      const nextCubeX = next.cubeX(cubeX, cubeY);
      const nextCubeY = next.cubeY(cubeX, cubeY);
      return {
        ...cubeCols[next.currentCube][nextCubeX][nextCubeY],
        cubeX: nextCubeX,
        cubeY: nextCubeY,
        dir: next.dir,
      };
    }
  }
}

let remainingPath = path;
while (remainingPath.length > 0) {
  switch (remainingPath[0]) {
    case 'R':
      turn(true);
      remainingPath = remainingPath.slice(1);
      break;
    case 'L':
      turn(false);
      remainingPath = remainingPath.slice(1);
      break;
    default:
      const moves = parseInt(remainingPath, 10);
      remainingPath = remainingPath.slice(moves.toString().length);

      for (let i = 0; i < moves; i++) {
        const next = nextTile();
        if (next.type === '#') {
          break;
        }
        ({ currentCube, cubeX, cubeY, dir, x, y } = next);
      }
  }
}

console.log((y + 1) * 1000 + (x + 1) * 4 + dir);
