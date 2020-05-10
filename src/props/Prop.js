import * as PIXI from 'pixi.js';

const defaultOptions = {
  x: 0,
  y: 0,
  interactive: false,
  draggable: false,
  consumable: false,
  onClick: () => {},
};

export default class Prop {

  constructor(options) {
    const opts = { ...defaultOptions, ...options };
    this.static = true;
    this.interactive = opts.interactive;
    this.draggable = opts.draggable;
    this.consumable = opts.consumable;
    this.onClick = opts.onClick;
    this.sprite = new PIXI.Container();
    this.sprite.interactive = opts.interactive;
    this.sprite.x = opts.x;
    this.sprite.y = opts.y;
  }

  update(delta) {}

  // Return false to delete the object after consumption
  consume() {
    return true;
  }

  setInteractive(interactive) {
    this.interactive = interactive;
    this.sprite.interactive = interactive;
  }
}
