import Prop from './Prop';

const TEXTURE_CLOSED = 'keurigClosed';
const TEXTURE_OPEN = 'keurigOpen';
const TEXTURE_OPEN_WITH_POD = 'keurigOpenWithPod';

export default class KeurigProp extends Prop {
  constructor(options) {
    super({
      interactive: true,
      ...options,
    });
    this.isOpen = false;
    this.hasPod = false;
    this.keurig = window.assetManager.getSprite(TEXTURE_CLOSED);
    this.sprite.addChild(this.keurig);
  }

  open() {
    this.isOpen = true;
    this.keurig.texture = window.assetManager.getSpriteTexture(
      this.hasPod ? TEXTURE_OPEN_WITH_POD : TEXTURE_OPEN
    );
  }

  close() {
    this.isOpen = false;
    this.keurig.texture = window.assetManager.getSpriteTexture(TEXTURE_CLOSED);
  }

  addPod() {
    if (this.isOpen) {
      this.hasPod = true;
      this.keurig.texture = window.assetManager.getSpriteTexture(TEXTURE_OPEN_WITH_POD);
    } else {
      // set fire
    }
  }

  removePod() {
    if (this.isOpen) {
      this.hasPod = false;
      this.keurig.texture = window.assetManager.getSpriteTexture(TEXTURE_CLOSED);
    }
  }
}
