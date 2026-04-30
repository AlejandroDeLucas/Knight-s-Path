import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class HUD {
  text: Phaser.GameObjects.Text;
  bossText: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene) {
    this.text = scene.add.text(16, 16, '', { color: '#fff', fontSize: '20px' }).setScrollFactor(0);
    this.bossText = scene.add.text(16, 44, '', { color: '#ff9999', fontSize: '18px' }).setScrollFactor(0);
  }
  update(player: Player, levelName: string, bossHp?: number): void {
    this.text.setText(`Nivel: ${levelName} | Corazones: ${player.hearts} | Dagas: ${player.daggers} | Cuerdas: ${player.ropes} | Escudo: ${player.shield} | Rescatados: ${player.rescued}/4`);
    this.bossText.setText(bossHp !== undefined ? `Troll HP: ${bossHp}` : '');
  }
}
