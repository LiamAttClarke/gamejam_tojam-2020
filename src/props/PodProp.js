import Prop from './Prop';

export default class PodProp extends Prop {
  constructor(options = {}) {
    super({
      interactive: true,
      draggable: true,
      ...options,
    });
    this.sprite = window.assetManager.getSprite('coffeePod');
    this.sprite.interactive = true;
    this.sprite.x = options.x;
    this.sprite.y = options.y;
    this.sprite.width = 100;
    this.sprite.height = 100;
  }
}
