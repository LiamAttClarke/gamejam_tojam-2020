import IntroScene from '../scenes/IntroScene';

export const Scene = {
  Intro: IntroScene,
};

export default class SceneManager {

  constructor() {
    this.activeScene = null;
    window.addEventListener('resize', this._onResize.bind(this));
  }

  async setScene(scene) {
    if (this.activeScene) {
      window.pixi.ticker.remove(this._onTick);
      this.activeScene.destroy();
    }
    this.activeScene = new scene();
    this.activeScene.setup();
    window.pixi.ticker.add(this._onTick.bind(this));
  }

  _onResize(event) {
    if (this.activeScene) {
      this.activeScene.onResize(event);
    }
  }

  _onTick(delta) {
    this.activeScene.update(delta);
    // Update global clock
    window.state.tick(delta);
  }
}
