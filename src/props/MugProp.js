import Prop from './Prop';

const MUG_EMPTY = 'mugEmpty';
const MUG_FULL = 'mugFull';

export default class MugProp extends Prop {
  constructor(options) {
    super({
      interactive: true,
      draggable: true,
      consumable: true,
      ...options,
    });
    this.isFull = options.full;
    this.mug = window.assetManager.getSprite(options.full ? MUG_FULL : MUG_EMPTY);
    this.mug.width = 128;
    this.mug.height = 128;
    this.sprite.addChild(this.mug);
  }

  consume() {
    this.empty();
    return false;
  }

  fill() {
    this.isFull = true;
    this.mug.texture = window.assetManager.getSpriteTexture(MUG_FULL);
  }

  empty() {
    this.isFull = false;
    this.mug.texture = window.assetManager.getSpriteTexture(MUG_EMPTY);
  }
}
