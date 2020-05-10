import * as PIXI from 'pixi.js';

const BACKGROUND_PREFIX = 'background';
const SPRITE_PREFIX = 'sprite';

export const assets = {
  backgrounds: {
    thisIsFine: '/backgrounds/this-is-fine.jpg',
    subway: '/backgrounds/subway.png',
  },
  sprites: {
    consumeIcon: '/sprites/stomach.png',
    // clock
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
    // keurig
    keurigClosed: '/sprites/keurigClosed.png',
    keurigOpen: '/sprites/keurigOpen.png',
    keurigOpenWithPod: '/sprites/keurigOpenWithPod.png',
  },
  sounds: {
    // soundOfSilence: '/sounds/sound-of-silence.mp3',
    // clock: '/sounds/clock.mp3',
    slurp: '/sounds/slurp.mp3',
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

  getSoundSrc(key) {
    return assets.sounds[key];
  }
}
