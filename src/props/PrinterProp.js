import Prop from './Prop';

export default class PrinterProp extends Prop {
  constructor(options = {}) {
    super(options);
    this.sprite = window.assetManager.getSprite('printer');
    this.sprite.interactive = options.interactive;
    this.sprite.width = 164;
    this.sprite.height = 264;
    this.sprite.x = options.x;
    this.sprite.y = options.y;
  }
}
