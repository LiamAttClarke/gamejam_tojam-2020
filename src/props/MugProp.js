import Prop from './Prop';
import { Howl } from 'howler';

const MUG_EMPTY = 'mugEmpty';
const MUG_FULL = 'mugFull';

export default class MugProp extends Prop {
  constructor(options = {}) {
    super({
      interactive: true,
      draggable: true,
      consumable: true,
      ...options,
    });
    this.isFull = options.full;
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
    return false;
  }

  fill() {
    this.isFull = true;
    this.sprite.texture = window.assetManager.getSpriteTexture(MUG_FULL);
  }

  empty() {
    this.isFull = false;
    this.sprite.texture = window.assetManager.getSpriteTexture(MUG_EMPTY);
  }
}
