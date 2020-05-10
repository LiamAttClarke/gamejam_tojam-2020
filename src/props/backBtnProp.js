import Prop from './Prop';

export default class PhotoProp extends Prop {
  constructor(options = {}) {
    super({
      interactive: true,
      draggable: false,
      ...options,
    });
    this.sprite = window.assetManager.getSprite('backBtn');
    this.sprite.interactive = true;
    this.sprite.x = options.x;
    this.sprite.y = options.y;
    this.sprite.width = 200;
    this.sprite.height = 250;
  }
}