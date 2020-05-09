import * as PIXI from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';

const defaultOptions = {
  interactive: false,
};

const glowFilter = new GlowFilter();

export default class Prop {

  constructor(assetManager, options = defaultOptions) {
    this._assetManager = assetManager;
    this.static = true;
    this.root = new PIXI.Container();
    this.root.interactive = options.interactive;
    if (options.interactive) {
      this.root.on('mouseover', this.onPointerOver.bind(this));
      this.root.on('mouseout', this.onPointerLeave.bind(this));
      if (options.onClick) {
        this.root.on('click', options.onClick);
      }
    }
  }

  update(delta) {}

  onPointerOver(event) {
    this.root.filters = [glowFilter];
  }

  onPointerLeave(event) {
    this.root.filters = [];
  }
}
