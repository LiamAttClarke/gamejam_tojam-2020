
import Prop from './Prop';

export default class SupermarketItemProp extends Prop {
  constructor(options = {}) {

    super({
      interactive: true,
      draggable: true,
      ...options
    });

    this.sprite = window.assetManager.getSprite(options.itemName);
    this.sprite.interactive = true;
    this.sprite.x = options.x;
    this.sprite.y = options.y;
  }
}
