import Phaser from 'phaser';
import { Player } from './Player';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  hp = 1;
  damage = 1;
  speed = 60;
  frozenUntil = 0;
  constructor(scene: Phaser.Scene, x:number, y:number, color=0x00aa00) {
    super(scene, x, y, 'rect');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setTint(color).setDisplaySize(46, 46);
    this.setCollideWorldBounds(true);
  }
  update(player: Player): void {
    if (this.scene.time.now < this.frozenUntil) { this.setVelocityX(0); return; }
    const dir = player.x < this.x ? -1 : 1;
    this.setVelocityX(this.speed * dir);
    this.setFlipX(dir > 0);
  }
  receiveDamage(amount=1): void { this.hp -= amount; if (this.hp <= 0) this.die(); }
  die(): void { this.destroy(); }
  freeze(ms:number): void { this.frozenUntil = this.scene.time.now + ms; this.setTint(0x66ccff); }
}
