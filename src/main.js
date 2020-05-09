import * as PIXI from 'pixi.js';
import State from './lib/State';
import SceneManager, { Scene } from './lib/SceneManager';
import AssetManager from './lib/AssetManager';

// Here be Liam's field of globals.
// Bask in its glory!
window.state = new State();
window.pixi = null;
window.assetManager = null;
window.sceneManager = null;

init().then(() => {
  console.log('Ready to go!');
}).catch((e) => {
  throw e;
});

async function init() {
  window.pixi = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xFFFFFF,
    antialias: true,
    resizeTo: window,
  });
  document.body.appendChild(window.pixi.view);
  window.assetManager = new AssetManager();
  await assetManager.preload();
  window.sceneManager = new SceneManager();
  window.sceneManager.setScene(Scene.Intro);
}
