import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  hearts = 3; daggers = 0; ropes = 0; shield = 0; rescued = 0; facing = 1;
  isDashing = false; invulUntil = 0;
  keys: any;
  constructor(scene: Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'rect'); scene.add.existing(this); scene.physics.add.existing(this);
    this.setDisplaySize(42, 56).setTint(0xcccccc).setCollideWorldBounds(true);
    this.keys = scene.input.keyboard?.addKeys('A,D,LEFT,RIGHT,SPACE,SHIFT,K,J,S,DOWN,ENTER');
  }
  update(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    const left = this.keys.A.isDown || this.keys.LEFT.isDown;
    const right = this.keys.D.isDown || this.keys.RIGHT.isDown;
    const crouch = this.keys.S.isDown || this.keys.DOWN.isDown;
    if (!this.isDashing) {
      if (left) { this.setVelocityX(-180); this.facing = -1; }
      else if (right) { this.setVelocityX(180); this.facing = 1; }
      else { this.setVelocityX(0); }
    }
    if ((Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) && body.blocked.down) this.setVelocityY(-420);
    if ((Phaser.Input.Keyboard.JustDown(this.keys.SHIFT) || Phaser.Input.Keyboard.JustDown(this.keys.K)) && !this.isDashing) {
      this.isDashing = true; this.setVelocityX(this.facing * 460); this.scene.time.delayedCall(240, () => { this.isDashing = false; });
    }
    this.setDisplaySize(42, crouch ? 42 : 56);
    this.updateArmorLook();
  }
  updateArmorLook(): void {
    if (this.hearts >= 3) this.setTint(0xcccccc); else if (this.hearts === 2) this.setTint(0xccaa66); else this.setTint(0xff88aa);
  }
  canTakeDamage(): boolean { return this.scene.time.now > this.invulUntil; }
  takeDamage(amount=1): void {
    if (!this.canTakeDamage()) return;
    if (this.shield > 0) { this.shield--; this.invulUntil = this.scene.time.now + 500; return; }
    this.hearts -= amount; this.invulUntil = this.scene.time.now + 1000;
  }
}
