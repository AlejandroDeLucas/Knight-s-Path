import Phaser from 'phaser';
import { GameScene, GameOverScene, IntroScene, LevelCompleteScene, MapEditorScene, MenuScene, OptionsScene } from './scenes/scenes';
import { GAME_HEIGHT, GAME_WIDTH } from './utils/constants';

// Ayuda de depuración: si algo rompe runtime, lo mostramos en HTML.
window.addEventListener('error', (event) => {
  const box = document.createElement('pre');
  box.style.color = '#ffb4b4';
  box.style.background = '#220000';
  box.style.padding = '8px';
  box.textContent = `Error runtime: ${event.message}`;
  document.body.appendChild(box);
});

new Phaser.Game({
  backgroundColor: '#1f2a44',
  type: Phaser.CANVAS,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'app',
  physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 950 }, debug: false } },
  scene: [MenuScene, IntroScene, GameScene, OptionsScene, MapEditorScene, GameOverScene, LevelCompleteScene]
});
