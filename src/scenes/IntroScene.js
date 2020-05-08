import * as PIXI from 'pixi.js';
import Scene from './Scene';

export default class IntroScene extends Scene {

  setup() {
    super.setup();
    this._welcomeText = new PIXI.Text('Hello World');
    this._welcomeText.x = this._app.screen.width / 2;
    this._welcomeText.y = this._app.screen.height / 2;
    this._container.addChild(this._welcomeText);
  }

  update(delta) {
    if (this._welcomeText) {
      this._welcomeText.rotation += 0.1 * delta;
    }
  }
}
