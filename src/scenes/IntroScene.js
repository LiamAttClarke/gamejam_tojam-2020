import * as PIXI from 'pixi.js';
import Scene from './Scene';
import ClockProp from '../props/ClockProp';

export default class IntroScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('thisIsFine');
    this.addProp('clock', new ClockProp(this._assetManager), 0.5, 0.5);
  }
}
