import Prop from './Prop';

export default class HandProp extends Prop {
  constructor(options) {
    super(options);
    this.static = false;
    this.secondsElapsed = (options && options.secondsElapsed) || 0; // seconds
    this.hand = window.assetManager.getSprite('handIdle');
    this.hand.pivot.x = 25;
    this.hand.pivot.y = 40;
    this.root.addChild(this.hand);
  }
}
