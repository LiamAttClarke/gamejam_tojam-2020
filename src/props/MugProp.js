import Prop from './Prop';

const MUG_EMPTY = 'mugEmpty';
const MUG_FULL = 'mugFull';

export default class MugProp extends Prop {
  constructor(options) {
    super(options);
    this.mug = window.assetManager.getSprite(options.full ? MUG_FULL : MUG_EMPTY);
    this.isFull = options.full;
    this.root.addChild(this.mug);
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
