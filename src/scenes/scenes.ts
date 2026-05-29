import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { ArmedGoblin, BabyGoblin, FatGoblin, FemaleGoblin, Goblin } from '../entities/Goblins';
import { Dagger, PowerUp, RescuableVillager, RockProjectile, RopeProjectile } from '../entities/Items';
import { meadowEnemies, meadowPlatforms, meadowPowerups, meadowRescuables } from '../levels/meadowLevel';
import { HUD } from '../ui/HUD';
import { WORLD_WIDTH } from '../utils/constants';

export class MenuScene extends Phaser.Scene {
  options = ['Nuevo juego', 'Continuar', 'Editor de mapas', 'Opciones', 'Salir'];
  index = 0;
  optionTexts: Phaser.GameObjects.Text[] = [];

  create() {
    // Fondo claro para evitar pantalla negra sin feedback.
    this.cameras.main.setBackgroundColor('#1f2a44');
    this.add.rectangle(640, 360, 1280, 720, 0x1f2a44);
    this.add.text(120, 90, 'Knight\'s Path', { fontSize: '56px', color: '#ffe08a' });
    this.add.text(120, 160, 'Selecciona una opción con flechas y ENTER', { fontSize: '22px', color: '#ffffff' });

    this.optionTexts = this.options.map((label, i) =>
      this.add.text(140, 250 + i * 58, label, { fontSize: '36px', color: '#cbd5e1' })
    );
    this.paintSelection();

    this.input.keyboard?.on('keydown-UP', () => {
      this.index = (this.index - 1 + this.options.length) % this.options.length;
      this.paintSelection();
    });
    this.input.keyboard?.on('keydown-DOWN', () => {
      this.index = (this.index + 1) % this.options.length;
      this.paintSelection();
    });
    this.input.keyboard?.on('keydown-ENTER', () => this.runOption());
  }

  paintSelection(): void {
    this.optionTexts.forEach((t, i) => t.setColor(i === this.index ? '#7dd3fc' : '#cbd5e1'));
  }

  runOption(): void {
    const selected = this.options[this.index];
    if (selected === 'Nuevo juego') this.scene.start('IntroScene');
    else if (selected === 'Continuar') this.scene.start('GameScene');
    else if (selected === 'Editor de mapas') this.scene.start('MapEditorScene');
    else if (selected === 'Opciones') this.scene.start('OptionsScene');
    else this.add.text(140, 610, 'Salir no aplica en navegador. Cierra la pestaña.', { fontSize: '20px', color: '#fca5a5' });
  }
}

export class IntroScene extends Phaser.Scene { create(){ this.cameras.main.setBackgroundColor('#10213a'); const lines=['El caballero duerme...','Un brujo secuestra a los habitantes...','Un soldado herido pide ayuda...','Empieza: La Pradera']; let i=0; const t=this.add.text(100,300,'',{fontSize:'36px',color:'#fff',wordWrap:{width:1000}}); const next=()=>{ if(i>=lines.length){this.scene.start('GameScene');return;} t.setText(lines[i++]); this.cameras.main.fadeIn(300); this.time.delayedCall(1700,next);} ; next(); } }

export class GameScene extends Phaser.Scene {
  player!: Player; hud!:HUD; enemies!: Phaser.Physics.Arcade.Group; daggers!: Phaser.Physics.Arcade.Group; ropes!: Phaser.Physics.Arcade.Group; rocks!: Phaser.Physics.Arcade.Group; bossZone!: Phaser.GameObjects.Zone; bossHp=10; bossActive=false;
  create(){
    if (!this.textures.exists('rect')) { const g=this.add.graphics(); g.fillStyle(0xffffff).fillRect(0,0,32,32); g.generateTexture('rect',32,32); g.destroy(); }
    this.physics.world.setBounds(0,0,WORLD_WIDTH,720); this.cameras.main.setBackgroundColor('#6cabdd');
    const platforms=this.physics.add.staticGroup(); meadowPlatforms.forEach(p=>platforms.create(p.x,p.y,'rect').setDisplaySize(p.w,p.h).setTint(0x3d8f3d).refreshBody());
    this.player=new Player(this,120,620); this.cameras.main.startFollow(this.player); this.cameras.main.setBounds(0,0,WORLD_WIDTH,720);
    this.enemies=this.physics.add.group(); meadowEnemies.forEach(e=>{const map:any={goblin:Goblin,armedGoblin:ArmedGoblin,fatGoblin:FatGoblin,femaleGoblin:FemaleGoblin,babyGoblin:BabyGoblin}; this.enemies.add(new map[e.type](this,e.x,e.y));});
    const powerups=this.physics.add.group(); meadowPowerups.forEach(p=>{ const colors:any={daggerBox:0x9ad1ff,ropeBox:0xd2b48c,shield:0xffff00,repairArmor:0xff0000}; powerups.add(new PowerUp(this,p.x,p.y,p.type,colors[p.type])); });
    const rescuables=this.physics.add.group(); meadowRescuables.forEach(r=>rescuables.add(new RescuableVillager(this,r.x,r.y,r.id,r.optional)));
    this.daggers=this.physics.add.group(); this.ropes=this.physics.add.group(); this.rocks=this.physics.add.group();
    const collidables = [this.player, this.enemies, this.daggers, this.ropes, this.rocks, powerups, rescuables];
    collidables.forEach((obj) => this.physics.add.collider(obj, platforms));
    this.physics.add.overlap(this.player,powerups,(_,p:any)=>{ if(p.kind==='daggerBox') this.player.daggers+=3; if(p.kind==='ropeBox') this.player.ropes+=3; if(p.kind==='shield') this.player.shield+=2; if(p.kind==='repairArmor') this.player.hearts=3; p.destroy();});
    this.physics.add.overlap(this.player,rescuables,(_,r:any)=>{ this.player.rescued++; r.destroy();});
    this.physics.add.overlap(this.player,this.enemies,(_,e:any)=>this.handlePlayerEnemy(e));
    this.physics.add.overlap(this.daggers,this.enemies,(d:any,e:any)=>{e.receiveDamage(1); d.destroy();});
    this.physics.add.overlap(this.ropes,this.enemies,(r:any,e:any)=>{e.freeze(2000); r.destroy();});
    this.physics.add.overlap(this.rocks,this.player,()=>this.player.takeDamage(1));
    this.physics.add.overlap(this.daggers,this.rocks,(d:any,r:any)=>{d.destroy(); r.destroy();});
    this.bossZone = this.add.zone(4920,590,180,160);
    this.physics.add.existing(this.bossZone, true);
    this.hud=new HUD(this);
  }
  handlePlayerEnemy(enemy:any){ if(this.player.isDashing && enemy instanceof ArmedGoblin){ const front=(this.player.x<enemy.x)?1:-1; if(front===enemy.dangerousSide){ this.player.takeDamage(1); return; } } if(this.player.isDashing) enemy.receiveDamage(1); else this.player.takeDamage(1); if(enemy instanceof FatGoblin && Phaser.Math.Between(0,100)<2){ this.player.hearts=0; } if(enemy instanceof BabyGoblin){ enemy.destroy(); this.player.takeDamage(1); } }
  update(){ this.player.update(); if (Phaser.Input.Keyboard.JustDown(this.player.keys.J) && this.player.daggers>0){ this.player.daggers--; this.daggers.add(new Dagger(this,this.player.x,this.player.y,this.player.facing)); } if (Phaser.Input.Keyboard.JustDown(this.player.keys.DOWN) && this.player.ropes>0){ this.player.ropes--; this.ropes.add(new RopeProjectile(this,this.player.x,this.player.y,this.player.facing)); } this.enemies.getChildren().forEach((e:any)=>{ e.update?.(this.player); if(e instanceof FemaleGoblin && this.time.now>e.spawnCd){ e.spawnCd=this.time.now+10000; this.enemies.add(new BabyGoblin(this,e.x+30,e.y)); } }); if(this.player.x>3800 && !this.bossActive){ if(Phaser.Math.Between(0,100)<4) this.rocks.add(new RockProjectile(this,this.cameras.main.worldView.x+Phaser.Math.Between(300,1000),80)); } if(this.player.x>4600){ this.bossActive=true; } if(this.bossActive && this.bossHp>0 && Phaser.Math.Between(0,100)<2){ this.rocks.add(new RockProjectile(this,4800,120)); } this.physics.overlap(this.daggers, this.bossZone, (d:any)=>{ if(this.player.daggers===0 && d.y<560) this.bossHp=0; else this.bossHp--; d.destroy(); }); if(this.bossHp<=0){ this.scene.start('LevelCompleteScene'); } if(this.player.hearts<=0){ this.scene.start('GameOverScene'); } this.hud.update(this.player,'La Pradera', this.bossActive?this.bossHp:undefined); }
}
export class OptionsScene extends Phaser.Scene { create(){ this.cameras.main.setBackgroundColor('#14213d'); this.add.text(80,140,'Opciones (MVP)',{fontSize:'48px',color:'#fff'}); this.add.text(80,250,'TODO: audio, dificultad, controles táctiles',{fontSize:'26px',color:'#e2e8f0'}); this.add.text(80,620,'ENTER para volver al menú',{fontSize:'24px',color:'#7dd3fc'}); this.input.keyboard?.once('keydown-ENTER',()=>this.scene.start('MenuScene')); } }
export class MapEditorScene extends Phaser.Scene { create(){ this.cameras.main.setBackgroundColor('#0f172a'); this.add.text(80,140,'Editor de mapas (placeholder)',{fontSize:'48px',color:'#fff'}); this.add.text(80,250,'Plan: pintar tiles y guardar JSON',{fontSize:'26px',color:'#e2e8f0'}); this.add.text(80,620,'ENTER para volver al menú',{fontSize:'24px',color:'#7dd3fc'}); this.input.keyboard?.once('keydown-ENTER',()=>this.scene.start('MenuScene')); } }
export class GameOverScene extends Phaser.Scene { create(){ this.cameras.main.setBackgroundColor('#220000'); this.add.text(300,260,'NO RESPAWN',{fontSize:'72px',color:'#ff4444'}); this.add.text(300,360,'ENTER para reiniciar',{fontSize:'28px',color:'#fff'}); this.input.keyboard?.once('keydown-ENTER',()=>this.scene.start('MenuScene')); } }
export class LevelCompleteScene extends Phaser.Scene { create(){ this.cameras.main.setBackgroundColor('#10213a'); this.add.text(180,280,'Beware of the dragons!',{fontSize:'64px',color:'#ffee88'}); this.add.text(260,380,'Level 2: Dragon Forest - Coming soon',{fontSize:'34px',color:'#fff'}); this.add.text(350,460,'ENTER para volver al menú',{fontSize:'24px',color:'#7dd3fc'}); this.input.keyboard?.once('keydown-ENTER',()=>this.scene.start('MenuScene')); } }
