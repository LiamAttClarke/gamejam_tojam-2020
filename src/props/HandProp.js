import Prop from './Prop';

export default class HandProp extends Prop {
  constructor(options) {
    super(options);
    this.hand = window.assetManager.getSprite('handIdle');
    this.hand.pivot.x = 25;
    this.hand.pivot.y = 40;
    this.sprite.addChild(this.hand);
  }
}
