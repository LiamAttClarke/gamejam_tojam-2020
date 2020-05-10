import * as PIXI from 'pixi.js';

const fireAnimationKeys = ['fireA', 'fireB', 'fireC', 'fireD'];
const defaultOptions = {
  x: 0,
  y: 0,
  interactive: false,
  draggable: false,
  consumable: false,
  onClick: () => {},
};

export default class Prop {

  constructor(options = {}) {
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

  update() {}

  destroy() {}

  // Return false to delete the object after consumption
  consume() {
    return true;
  }

  setInteractive(interactive) {
    this.interactive = interactive;
    this.sprite.interactive = interactive;
    this.sprite.filters = [];
  }

  setFire() {
    const animationKey = fireAnimationKeys[Math.floor(Math.random() * fireAnimationKeys.length)];
    const fire = window.assetManager.getAnimatedSprite('fire', animationKey);
    fire.animationSpeed = 0.25;
    fire.width = this.sprite.texture.width;
    fire.height = this.sprite.texture.height;
    this.sprite.addChild(fire);
    fire.play();
  }
}
