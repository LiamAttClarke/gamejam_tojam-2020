import * as PIXI from 'pixi.js';
import SceneManager, { Scene } from './lib/SceneManager';
import AssetManager from './lib/AssetManager';

init().then(() => {
  console.log('Ready to go!');
}).catch((e) => {
  throw e;
});

async function init() {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xFFFFFF,
    antialias: true,
    resizeTo: window,
  });
  document.body.appendChild(app.view);
  const assetManager = new AssetManager(app);
  await assetManager.preload();
  const sceneManager = new SceneManager(app, assetManager);
  sceneManager.setScene(Scene.Intro);
}
