import IntroScene from './scenes/IntroScene';
import SadScene from './scenes/SadScene';

export const Scene = {
  Intro: IntroScene,
  Sad: SadScene,
};

export default class SceneManager {

  constructor(app, assetManager) {
    this._app = app;
    this._assetManager = assetManager;
    this.activeScene = null;
    window.addEventListener('resize', this._onResize.bind(this));
  }

  async setScene(scene) {
    if (this.activeScene) this.activeScene.destroy();
    this.activeScene = new scene(this._app, this, this._assetManager);
    this.activeScene.setup();
    this._app.ticker.add((delta) => this.activeScene.update(delta));
  }

  _onResize(event) {
    if (this.activeScene) {
      this.activeScene.onResize(event);
    }
  }
}
