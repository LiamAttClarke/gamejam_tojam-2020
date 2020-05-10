import Prop from './Prop';

export default class ComputerProp extends Prop {
  constructor(options = {}) {
    super(options);
    this.sprite = window.assetManager.getSprite('computer');
    this.sprite.interactive = options.interactive;
    this.sprite.x = options.x;
    this.sprite.y = options.y;
  }
}
