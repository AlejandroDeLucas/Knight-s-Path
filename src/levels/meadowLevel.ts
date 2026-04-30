import { EnemySpawn, Platform, PowerUpSpawn, RescuableSpawn } from './levelTypes';

export const meadowPlatforms: Platform[] = [
  { x: 600, y: 680, w: 5200, h: 80 },
  { x: 700, y: 560, w: 240, h: 30 },
  { x: 1300, y: 500, w: 220, h: 30 },
  { x: 2200, y: 530, w: 260, h: 30 }
];

export const meadowEnemies: EnemySpawn[] = [
  { type: 'goblin', x: 900, y: 620 },
  { type: 'goblin', x: 1500, y: 620 },
  { type: 'armedGoblin', x: 2000, y: 620 },
  { type: 'fatGoblin', x: 2600, y: 620 },
  { type: 'femaleGoblin', x: 3000, y: 620 },
  { type: 'armedGoblin', x: 3500, y: 620 }
];

export const meadowPowerups: PowerUpSpawn[] = [
  { type: 'daggerBox', x: 1100, y: 460 },
  { type: 'ropeBox', x: 2250, y: 490 },
  { type: 'shield', x: 3250, y: 620 },
  { type: 'repairArmor', x: 4100, y: 620 }
];

export const meadowRescuables: RescuableSpawn[] = [
  { id: 'villager_1', x: 1700, y: 620, optional: true },
  { id: 'villager_2', x: 2800, y: 620, optional: true },
  { id: 'villager_3', x: 3900, y: 620, optional: true },
  { id: 'blacksmith', x: 4920, y: 620, optional: false }
];
