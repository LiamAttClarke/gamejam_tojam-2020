import * as PIXI from 'pixi.js';
import SceneManager, { Scene } from './SceneManager';

init();

function init() {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xFFFFFF,
    antialias: true,
    resizeTo: window,
  });
  document.body.appendChild(app.view);
  const sceneManager = new SceneManager(app);
  sceneManager.setScene(Scene.Intro);
}
