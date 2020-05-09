import * as PIXI from 'pixi.js';

const defaultOptions = {
  interactive: false,
};

export default class Prop {

  constructor(assetManager, options = defaultOptions) {
    this._assetManager = assetManager;
    this.static = true;
    this.root = new PIXI.Container();
    this.interactive = options.interactive;
  }

  /** only */
  update(delta) {}
}
