import * as PIXI from 'pixi.js';

const fireAnimationKeys = ['fireA', 'fireB', 'fireC', 'fireD'];
const defaultOptions = {
  x: 0,
  y: 0,
  interactive: false,
  draggable: false,
  consumable: false,
  onClick: () => {},
  onGrab: () => {},
  onConsume: () => {},
};

export default class Prop {

  constructor(options = {}) {
    const opts = { ...defaultOptions, ...options };
    this.isOnFire = false;
    this.static = true;
    this.interactive = opts.interactive;
    this.draggable = opts.draggable;
    this.consumable = opts.consumable;
    this.onClick = opts.onClick;
    this.onGrab = opts.onGrab;
    this.onConsume = opts.onConsume;
    this.sprite = new PIXI.Container();
    this.sprite.interactive = opts.interactive;
    this.sprite.x = opts.x;
    this.sprite.y = opts.y;
  }

  update() {}

  destroy() {}

  // Return true to delete the object after consumption
  consume() {
    this.onConsume();
    return true;
  }

  setInteractive(interactive) {
    this.interactive = interactive;
    this.sprite.interactive = interactive;
    this.sprite.filters = [];
  }

  setFire(skipSceneFire) {
    this.isOnFire = true;
    const animationKey = fireAnimationKeys[Math.floor(Math.random() * fireAnimationKeys.length)];
    const fire = window.assetManager.getAnimatedSprite('fire', animationKey);
    fire.animationSpeed = 0.25;
    fire.width = this.sprite.texture.width;
    fire.height = this.sprite.texture.height;
    this.sprite.addChild(fire);
    fire.play();

    // set fire to whole scene after some time
    if (!skipSceneFire) {
      setTimeout(() => {
        window.sceneManager.activeScene.setFire();
      }, 2000);
    }
  }
}
