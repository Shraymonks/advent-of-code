import { getInput } from '../utils.js';

const input = await getInput();
const [bossHp, bossDamage] = input
  .split('\n')
  .map((line) => Number(line.split(': ')[1])) as [number, number];

const q = [
  {
    bossHealth: bossHp,
    health: 50,
    mana: 500,
    manaSpent: 0,
    poisonTurns: 0,
    rechargeTurns: 0,
    shieldTurns: 0,
  },
];

let minMana = Infinity;

while (q.length > 0) {
  let {
    bossHealth,
    health,
    mana,
    manaSpent,
    poisonTurns,
    rechargeTurns,
    shieldTurns,
  } = q.pop()!;
  if (poisonTurns > 0) {
    const turns = Math.min(poisonTurns, 2);
    bossHealth -= 3 * turns;
    poisonTurns -= turns;
  }
  if (bossHealth <= 0) {
    minMana = Math.min(minMana, manaSpent);
    continue;
  }
  if (rechargeTurns > 0) {
    const turns = Math.min(rechargeTurns, 2);
    mana += 101 * turns;
    rechargeTurns -= turns;
  }
  if (shieldTurns > 0) {
    shieldTurns -= Math.min(shieldTurns, 2);
  }
  --health;
  if (health <= 0 || mana < 53) {
    continue;
  }

  function nextHealth(turns = shieldTurns): number {
    return health - (turns > 1 ? Math.max(1, bossDamage - 7) : bossDamage);
  }

  if (mana >= 53) {
    q.push({
      bossHealth: bossHealth - 4,
      health: nextHealth(),
      mana: mana - 53,
      manaSpent: manaSpent + 53,
      poisonTurns,
      rechargeTurns,
      shieldTurns,
    });
  }
  if (mana >= 73) {
    q.push({
      bossHealth: bossHealth - 2,
      health: nextHealth() + 2,
      mana: mana - 73,
      manaSpent: manaSpent + 73,
      poisonTurns,
      rechargeTurns,
      shieldTurns,
    });
  }
  if (mana >= 113 && shieldTurns === 0) {
    q.push({
      bossHealth,
      health: nextHealth(6),
      mana: mana - 113,
      manaSpent: manaSpent + 113,
      poisonTurns,
      rechargeTurns,
      shieldTurns: 6,
    });
  }
  if (mana >= 173 && poisonTurns === 0) {
    q.push({
      bossHealth,
      health: nextHealth(),
      mana: mana - 173,
      manaSpent: manaSpent + 173,
      poisonTurns: 6,
      rechargeTurns,
      shieldTurns,
    });
  }
  if (mana >= 229 && rechargeTurns === 0) {
    q.push({
      bossHealth,
      health: nextHealth(),
      mana: mana - 229,
      manaSpent: manaSpent + 229,
      poisonTurns,
      rechargeTurns: 5,
      shieldTurns,
    });
  }
}

console.log(minMana);
