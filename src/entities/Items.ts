import Phaser from 'phaser';

export class Dagger extends Phaser.Physics.Arcade.Sprite {
  constructor(scene:Phaser.Scene,x:number,y:number,dir:number){ super(scene,x,y,'rect'); scene.add.existing(this); scene.physics.add.existing(this); this.setDisplaySize(20,8).setTint(0xffffff).setVelocityX(400*dir); }
}
export class RopeProjectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene:Phaser.Scene,x:number,y:number,dir:number){ super(scene,x,y,'rect'); scene.add.existing(this); scene.physics.add.existing(this); this.setDisplaySize(16,10).setTint(0xd2b48c).setVelocityX(320*dir); }
}
export class RockProjectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene:Phaser.Scene,x:number,y:number){ super(scene,x,y,'rect'); scene.add.existing(this); scene.physics.add.existing(this); this.setDisplaySize(24,24).setTint(0x888888).setVelocity(Phaser.Math.Between(-40,40),240); }
}

export class PowerUp extends Phaser.Physics.Arcade.Sprite {
  kind:string;
  constructor(scene:Phaser.Scene,x:number,y:number,kind:string,color:number){ super(scene,x,y,'rect'); this.kind=kind; scene.add.existing(this); scene.physics.add.existing(this); this.setDisplaySize(30,30).setTint(color); }
}

export class RescuableVillager extends Phaser.Physics.Arcade.Sprite {
  id:string; optional:boolean;
  constructor(scene:Phaser.Scene,x:number,y:number,id:string,optional:boolean){ super(scene,x,y,'rect'); this.id=id; this.optional=optional; scene.add.existing(this); scene.physics.add.existing(this); this.setDisplaySize(34,44).setTint(optional?0x7ec8e3:0xf1c40f); }
}
