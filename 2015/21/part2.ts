import { getInput } from '../utils.js';

const input = await getInput();
const [bossHp, bossDamage, bossArmor] = input
  .split('\n')
  .map((line) => Number(line.split(': ')[1])) as [number, number, number];

const weapons = [
  { cost: 8, damage: 4 },
  { cost: 10, damage: 5 },
  { cost: 25, damage: 6 },
  { cost: 40, damage: 7 },
  { cost: 74, damage: 8 },
];
const armors = [
  { cost: 13, armor: 1 },
  { cost: 31, armor: 2 },
  { cost: 53, armor: 3 },
  { cost: 75, armor: 4 },
  { cost: 102, armor: 5 },
];
const rings = [
  { cost: 25, damage: 1, armor: 0 },
  { cost: 50, damage: 2, armor: 0 },
  { cost: 100, damage: 3, armor: 0 },
  { cost: 20, damage: 0, armor: 1 },
  { cost: 40, damage: 0, armor: 2 },
  { cost: 80, damage: 0, armor: 3 },
];

function winFight(damage: number, armor: number): boolean {
  let health = 100;
  let bossHealth = bossHp;

  const netDamage = Math.max(1, damage - bossArmor);
  const bossNetDamage = Math.max(1, bossDamage - armor);

  return Math.ceil(bossHealth / netDamage) <= Math.ceil(health / bossNetDamage);
}

const q = weapons.map(({ cost, damage }) => ({
  armor: 0,
  damage,
  spent: cost,
}));

let stop = q.length;
for (let i = 0; i < stop; i++) {
  const { armor, damage, spent } = q[i]!;
  for (const a of armors) {
    q.push({
      armor: armor + a.armor,
      damage,
      spent: spent + a.cost,
    });
  }
}

stop = q.length;
for (let i = 0; i < stop; i++) {
  const { armor, damage, spent } = q[i]!;
  for (let i = 0; i < rings.length; i++) {
    const ring1 = rings[i]!;
    q.push({
      armor: armor + ring1.armor,
      damage: damage + ring1.damage,
      spent: spent + ring1.cost,
    });
    for (let j = i + 1; j < rings.length; j++) {
      const ring2 = rings[j]!;
      q.push({
        armor: armor + ring1.armor + ring2.armor,
        damage: damage + ring1.damage + ring2.damage,
        spent: spent + ring1.cost + ring2.cost,
      });
    }
  }
}

let maxCost = 0;

while (q.length > 0) {
  const { armor, damage, spent } = q.pop()!;

  if (!winFight(damage, armor)) {
    maxCost = Math.max(maxCost, spent);
  }
}

console.log(maxCost);
