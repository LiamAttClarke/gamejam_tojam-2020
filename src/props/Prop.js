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

  constructor(options = defaultOptions) {
    this.static = true;
    this.interactive = options.interactive;
    this.draggable = options.draggable;
    this.consumable = options.consumable;
    this.onClick = options.onClick;
    this.sprite = new PIXI.Container();
    this.sprite.interactive = options.interactive;
    this.sprite.x = options.x;
    this.sprite.y = options.y;
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
