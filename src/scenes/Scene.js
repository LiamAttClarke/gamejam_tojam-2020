import * as PIXI from 'pixi.js';

// Abstract Scene Class
export default class Scene {

  constructor(app, sceneManager) {
    this._app = app;
    this._sceneManager = sceneManager;
    this._container = new PIXI.Container();
  }

  /** Initialize your scene */
  setup() {
    this._app.stage.addChild(this._container);
  }

  /**
   * Update Loop that runs every frame
   * @param {Number} delta time elapsed since last frame (seconds)
   */
  update() {}

  /** Called before switching to next Scene */
  destroy() {
    this._app.stage.removeChild(this._container);
  }
}
