import Prop from './Prop';
import { Howl } from 'howler';

const TEXTURE_CLOSED = 'keurigClosed';
const TEXTURE_OPEN = 'keurigOpen';
const TEXTURE_OPEN_WITH_POD = 'keurigOpenWithPod';

export default class KeurigProp extends Prop {
  constructor(options = {}) {
    const opts = {
      interactive: true,
      ...options,
    }
    super(opts);
    this.isOpen = false;
    this.hasPod = false;
    this.pouring = false;
    this.sprite = window.assetManager.getSprite(TEXTURE_CLOSED);
    this.sprite.interactive = opts.interactive;
    this.sprite.x = opts.x;
    this.sprite.y = opts.y;
    this.pourSound = new Howl({
      src: window.assetManager.getSoundSrc('pour'),
    });
    this.onPour = options.onPour;
  }

  open() {
    if (!this.pouring) {
      this.isOpen = true;
      this.sprite.texture = window.assetManager.getSpriteTexture(
        this.hasPod ? TEXTURE_OPEN_WITH_POD : TEXTURE_OPEN
      );
    }
  }

  close() {
    this.isOpen = false;
    this.sprite.texture = window.assetManager.getSpriteTexture(TEXTURE_CLOSED);
  }

  addPod() {
    if (this.isOpen) {
      this.hasPod = true;
      this.sprite.texture = window.assetManager.getSpriteTexture(TEXTURE_OPEN_WITH_POD);
    } else {
      // set fire
    }
  }

  removePod() {
    if (this.isOpen) {
      this.hasPod = false;
      this.sprite.texture = window.assetManager.getSpriteTexture(TEXTURE_CLOSED);
    }
  }

  activate() {
    if (this.hasPod && !this.isOpen) {
      this.pouring = true;
      this.pourSound.play();
      this.pourSound.on('end', () => {
        this.pouring = false;
        this.hasPod = false;
        this.onPour();
      });
    }
  }
}
