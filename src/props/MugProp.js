import Prop from './Prop';
import { Howl } from 'howler';

const MUG_EMPTY = 'mugEmpty';
const MUG_FULL = 'mugFull';

export default class MugProp extends Prop {
  constructor(options = {}) {
    super({
      interactive: true,
      draggable: true,
      consumable: options.full,
      ...options,
    });
    this.sprite = window.assetManager.getSprite(options.full ? MUG_FULL : MUG_EMPTY);
    this.sprite.interactive = options.interactive;
    this.sprite.x = options.x;
    this.sprite.y = options.y;
    this.sprite.width = 128;
    this.sprite.height = 128;
    this.slurpSound = new Howl({
      src: window.assetManager.getSoundSrc('slurp'),
    });
  }

  consume() {
    this.slurpSound.play();
    this.empty();
    // increase speed of time 10 times;
    window.pixi.ticker.speed += 10;
    this.onConsume();
    return false;
  }

  fill() {
    this.consumable = true;
    this.sprite.texture = window.assetManager.getSpriteTexture(MUG_FULL);
  }

  empty() {
    this.consumable = false;
    this.sprite.texture = window.assetManager.getSpriteTexture(MUG_EMPTY);
  }
}
