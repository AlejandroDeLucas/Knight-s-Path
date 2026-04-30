import { Enemy } from './Enemy';
import { Player } from './Player';

export class Goblin extends Enemy {
  constructor(scene:any,x:number,y:number){ super(scene,x,y,0x3cb043); }
  override update(player:Player): void {
    if (player.hearts === 3) { const dir = player.x < this.x ? 1 : -1; this.setVelocityX(120*dir); }
    else super.update(player);
  }
}

export class ArmedGoblin extends Enemy {
  dangerousSide = 1;
  constructor(scene:any,x:number,y:number){ super(scene,x,y,0x2f6f2f); this.dangerousSide = Math.random()>0.5?1:-1; }
}

export class FatGoblin extends Enemy {
  grabActive = false;
  constructor(scene:any,x:number,y:number){ super(scene,x,y,0x556b2f); this.hp=3; this.speed=40; this.setDisplaySize(68,68); }
}

export class FemaleGoblin extends Enemy {
  spawnCd = 0;
  constructor(scene:any,x:number,y:number){ super(scene,x,y,0x9b59b6); this.setDisplaySize(56,62); this.speed=110; }
  override update(player:Player): void { const dir = player.x < this.x ? 1 : -1; this.setVelocityX(100*dir); }
}

export class BabyGoblin extends Enemy {
  constructor(scene:any,x:number,y:number){ super(scene,x,y,0x6ee16e); this.setDisplaySize(24,24); this.speed=190; }
}
