export type EnemyType = 'goblin' | 'armedGoblin' | 'fatGoblin' | 'femaleGoblin' | 'babyGoblin';
export type PowerUpType = 'daggerBox' | 'ropeBox' | 'shield' | 'repairArmor';

export interface SpawnPoint { x: number; y: number; }
export interface EnemySpawn extends SpawnPoint { type: EnemyType; }
export interface PowerUpSpawn extends SpawnPoint { type: PowerUpType; }
export interface RescuableSpawn extends SpawnPoint { id: string; optional: boolean; }
export interface Platform { x:number; y:number; w:number; h:number; }
