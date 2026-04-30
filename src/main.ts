import Phaser from 'phaser';
import { GameScene, GameOverScene, IntroScene, LevelCompleteScene, MenuScene } from './scenes/scenes';
import { GAME_HEIGHT, GAME_WIDTH } from './utils/constants';

new Phaser.Game({
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'app',
  physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 950 }, debug: false } },
  scene: [MenuScene, IntroScene, GameScene, GameOverScene, LevelCompleteScene]
});
