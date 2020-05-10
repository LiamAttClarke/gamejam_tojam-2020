import Prop from './Prop';

export default class ConsumeIconProp extends Prop {
  constructor(options = {}) {
    const opts = {
      interactive: true,
      ...options,
    }
    super(opts);
    this.sprite = window.assetManager.getSprite('consumeIcon');
    this.sprite.interactive = opts.interactive;
    this.sprite.x = opts.x;
    this.sprite.y = opts.y;
    this.sprite.width = 140;
    this.sprite.height = 128;
  }
}
