import { getInput } from '../utils.js';

const input = await getInput();
const lines = input.split('\n');

const ingredientFactors = lines.map((line) => {
  const matches = line.match(
    /.+: capacity (.+), durability (.+), flavor (.+), texture (.+), calories (.+)/
  )!;

  return matches.slice(1).map(Number);
});

let max = 0;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100 - i; j++) {
    for (let k = 0; k < 100 - i - j; k++) {
      const teaspoons = [i, j, k, 100 - i - j - k];
      const amounts = ingredientFactors.map((factors, index) =>
        factors.map((factor) => factor * teaspoons[index]!)
      );
      const calories = amounts.reduce(
        (calories, props) => calories + props[4]!,
        0
      );
      if (calories !== 500) {
        continue;
      }
      let score = 1;
      for (let a = 0; a < ingredientFactors[0]!.length - 1; a++) {
        let propertyScore = 0;
        for (let b = 0; b < amounts.length; b++) {
          propertyScore += amounts[b]![a]!;
        }
        score *= Math.max(0, propertyScore);
      }
      max = Math.max(max, score);
    }
  }
}

console.log(max);
