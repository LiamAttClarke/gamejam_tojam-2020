import Prop from './Prop';

export default class ConsumeIconProp extends Prop {
  constructor(options) {
    super({
      interactive: true,
      ...options,
    });
    this.icon = window.assetManager.getSprite('consumeIcon');
    this.icon.width = 140;
    this.icon.height = 128;
    this.sprite.addChild(this.icon);
  }
}
