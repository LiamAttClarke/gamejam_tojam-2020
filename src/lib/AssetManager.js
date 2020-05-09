import * as PIXI from 'pixi.js';
import { Howl } from 'howler';

const BACKGROUND_PREFIX = 'background';
const SPRITE_PREFIX = 'sprite';

export const assets = {
  backgrounds: {
    thisIsFine: '/backgrounds/this-is-fine.jpg',
    subway: '/backgrounds/subway.png',
  },
  sprites: {
    dog: '/sprites/dog.png',
    clockFace: '/sprites/clock/clock_face.png',
    clockHourHand: '/sprites/clock/clock_hour-hand.png',
    clockMinuteHand: '/sprites/clock/clock_minute-hand.png',
    clockSecondHand: '/sprites/clock/clock_second-hand.png',
    // hand
    handIdle: '/sprites/hand/hand_pointing.png',
    handPointing: '/sprites/hand/hand_pointing.png',
    handGrabbing: '/sprites/hand/hand_pointing.png',
    // mug
    mugEmpty: '/sprites/mugEmpty.png',
    mugFull: '/sprites/mugFull.png',
  },
  sounds: {
    soundOfSilence: '/sounds/sound-of-silence.mp3',
  },
};

export default class AssetManager {
  constructor() {
    this._howl = null;
  }

  preload() {
    return new Promise((resolve, reject) => {
      Object.entries(assets.backgrounds).forEach(([key, path]) => {
        window.pixi.loader.add(`${BACKGROUND_PREFIX}_${key}`, path);
      });
      Object.entries(assets.sprites).forEach(([key, path]) => {
        window.pixi.loader.add(`${SPRITE_PREFIX}_${key}`, path);
      });
      window.pixi.loader.onError.add(reject);
      window.pixi.loader.onComplete.add(resolve);
      window.pixi.loader.load();
    });
  }

  getBackground(key) {
    const resource = window.pixi.loader.resources[`${BACKGROUND_PREFIX}_${key}`];
    if (!resource) throw new Error(`Background '${key}' not found.`);
    const background = new PIXI.Sprite(resource.texture);
    background.pivot.x = background.texture.width * 0.5;
    background.pivot.y = background.texture.height * 0.5;
    return background;
  }

  getSprite(key) {
    const resource = window.pixi.loader.resources[`${SPRITE_PREFIX}_${key}`];
    if (!resource) throw new Error(`Sprite '${key}' not found.`);
    return new PIXI.Sprite(resource.texture);
  }

  getSpriteTexture(key) {
    return PIXI.Texture.from(assets.sprites[key]);
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
