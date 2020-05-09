import Prop from './Prop';

export default class ClockProp extends Prop {
  constructor(assetManager, options) {
    super(assetManager, options);
    this.static = false;
    this.secondsElapsed = options.secondsElapsed || 0; // seconds
    // Face
    this.clockFace = this._assetManager.getSprite('clockFace');
    this.clockFace.pivot.x = this.clockFace.width / 2;
    this.clockFace.pivot.y = this.clockFace.height / 2;
    this.root.addChild(this.clockFace);
    // Hour Hand
    this.hourHand = this._assetManager.getSprite('clockFace');
    this.hourHand.pivot.y = this.clockFace.height / 2;
    this.root.addChild(this.hourHand);
    // Minute Hand
    this.minuteHand = this._assetManager.getSprite('clockFace');
    this.minuteHand.pivot.y = this.clockFace.height / 2;
    this.root.addChild(this.minuteHand);
    // Second Hand
    this.secondHand = this._assetManager.getSprite('clockFace');
    this.secondHand.pivot.y = this.clockFace.height / 2;
    this.root.addChild(this.secondHand);
  }

  get secondPosition() {
    return this.secondsElapsed % 60;
  }

  get minutePosition() {
    return (this.secondsElapsed % 3600) / 60;
  }

  get hourPosition() {
    return (this.secondsElapsed % 43200) / 3600;
  }

  update(delta) {
    // Update clock hands
    const secondsDelta = delta / 60;
    this.secondsElapsed += secondsDelta;
    const pi2 = Math.PI * 2;
    this.secondHand.rotation = pi2 * (Math.round(this.secondPosition) / 60);
    this.minuteHand.rotation = pi2 * (this.minutePosition / 60);
    this.hourHand.rotation = pi2 * (this.hourPosition / 12);
  }
}
