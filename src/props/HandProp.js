import Prop from './Prop';

export const HandState = {
  Idle: 'handPointing',
  Pointing: 'handPointing',
  Grabbing: 'handGrabbing',
};

export default class HandProp extends Prop {
  constructor(options = {}) {
    super(options);
    this.sprite.sortableChildren = true;
    this.hand = window.assetManager.getSprite('handIdle');
    this.hand.pivot.x = 25;
    this.hand.pivot.y = 40;
    this.hand.zIndex = 2;
    this.sprite.addChild(this.hand);
    this.state = HandState.Idle;
    this.propInHand = null;
    this.propParent = null;
  }

  setState(state) {
    this.state = state;
    this.hand.texture = window.assetManager.getSpriteTexture(state);
  }

  grab(prop) {
    this.propInHand = prop;
    this.propParent = prop.sprite.parent;
    this.setState(HandState.Grabbing);
    prop.sprite.filters = [];
    prop.setInteractive(false);
    prop.sprite.x = 0;
    prop.sprite.y = -prop.sprite.height / 2;
    prop.sprite.width *= 2;
    prop.sprite.height *= 2;
    prop.sprite.setParent(this.sprite);
  }

  release() {
    const prop = this.propInHand;
    if (prop) {
      this.propInHand = null;
      prop.sprite.setParent(this.propParent);
      prop.sprite.position = this.sprite.position;
      prop.sprite.width *= 0.5;
      prop.sprite.height *= 0.5;
      prop.setInteractive(true);
      this.setState(HandState.Pointing);
    }
    return prop;
  }
}
