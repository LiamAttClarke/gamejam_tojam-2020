import IntroScene from './scenes/IntroScene';

export const Scene = {
  Intro: IntroScene,
};

export default class SceneManager {

  constructor(app) {
    this._app = app;
    this.activeScene = null;
  }

  async setScene(scene) {
    if (this.activeScene) this.activeScene.destroy();
    this.activeScene = new scene(this._app, this);
    this.activeScene.setup();
    this._app.ticker.add((delta) => this.activeScene.update(delta));
  }
}
