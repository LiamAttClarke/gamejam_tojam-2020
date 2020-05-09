import * as PIXI from 'pixi.js';
import { Howl, Howler } from 'howler';

const BACKGROUND_PREFIX = 'background';
const SPRITE_PREFIX = 'sprite';

const assets = {
  backgrounds: {
    thisIsFine: '/backgrounds/this-is-fine.jpg',
  },
  sprites: {
    dog: '/sprites/dog.png',
    clockFace: '/sprites/dog.png',
  },
  sounds: {
    soundOfSilence: '/sounds/sound-of-silence.mp3',
  },
};

export default class AssetManager {
  constructor(app) {
    this._app = app;
    this._howl = null;
  }

  preload() {
    return new Promise((resolve, reject) => {
      Object.entries(assets.backgrounds).forEach(([key, path]) => {
        this._app.loader.add(`${BACKGROUND_PREFIX}_${key}`, path);
      });
      Object.entries(assets.sprites).forEach(([key, path]) => {
        this._app.loader.add(`${SPRITE_PREFIX}_${key}`, path);
      });
      this._app.loader.onError.add(reject);
      this._app.loader.onComplete.add(resolve);
      this._app.loader.load();
    });
  }

  getBackground(key) {
    const resource = this._app.loader.resources[`${BACKGROUND_PREFIX}_${key}`];
    if (!resource) throw new Error(`Background '${key}' not found.`);
    const background = new PIXI.Sprite(resource.texture);
    background.pivot.x = background.texture.width * 0.5;
    background.pivot.y = background.texture.height * 0.5;
    return background;
  }

  getSprite(key) {
    const resource = this._app.loader.resources[`${SPRITE_PREFIX}_${key}`];
    if (!resource) throw new Error(`Sprite '${key}' not found.`);
    const sprite = new PIXI.Sprite(resource.texture);
    return sprite;
  }

  playSound(key, options) {
    if (this._howl) this._howl.stop();
    // TODO: Load sound effects as audio-spritesheet for faster playback.
    const src = assets.sounds[key];
    if (!src) throw new Error(`Sound '${key}' not found.`);
    this._howl = new Howl({
      src: [src],
      ...options,
    });
    this._howl.play();
    return this._howl;
  }
}
