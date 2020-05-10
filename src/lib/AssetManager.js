import * as PIXI from 'pixi.js';

const BACKGROUND_PREFIX = 'background';
const SPRITE_PREFIX = 'sprite';
const SPRITESHEET_PREFIX = 'spritesheet';

export const assets = {
  backgrounds: {
    thisIsFine: '/backgrounds/this-is-fine.jpg',
    subway: '/backgrounds/subway.png',
    computer: '/backgrounds/computer.png',
    credits: '/backgrounds/credits.png',
    supermarket: '/backgrounds/supermarket.png',
  },
  sprites: {
    //photo:
    photo: '/sprites/credits.png',
    consumeIcon: '/sprites/stomach.png',
    // clock
    clockFace: '/sprites/clock/clock_face.png',
    clockHourHand: '/sprites/clock/clock_hour-hand.png',
    clockMinuteHand: '/sprites/clock/clock_minute-hand.png',
    clockSecondHand: '/sprites/clock/clock_second-hand.png',
    // hand
    handIdle: '/sprites/hand/hand_pointing.png',
    handPointing: '/sprites/hand/hand_pointing.png',
    handGrabbing: '/sprites/hand/hand_grabbing.png',
    // mug
    mugEmpty: '/sprites/mugEmpty.png',
    mugFull: '/sprites/mugFull.png',
    // keurig
    keurigClosed: '/sprites/keurig/keurigClosed.png',
    keurigOpen: '/sprites/keurig/keurigOpen.png',
    keurigOpenWithPod: '/sprites/keurig/keurigOpenWithPod.png',
    keurigButton: '/sprites/keurig/keurigButton.png',
    coffeePod: '/sprites/coffeePod.png',
    // computer
    computer: '/sprites/computer.png',
    printer: '/sprites/printer.png',
    // supermarket items
    flour: '/sprites/supermarket/flour.png',
    gansito: '/sprites/supermarket/gansito.png',
    soda: '/sprites/supermarket/soda.png',
    wine: '/sprites/supermarket/wine.png',
    bananas: '/sprites/supermarket/bananas.png',
    carrots: '/sprites/supermarket/carrots.png',
    raspberries: '/sprites/supermarket/raspberries.png',
    toiletPaper: '/sprites/supermarket/toilet-paper.png',
  },
  spritesheets: {
    fire: '/animations/fire/fire.json'
  },
  sounds: {
    end: '/sounds/sound-of-silence.mp3',
    // clock: '/sounds/clock.mp3',
    slurp: '/sounds/slurp.mp3',
    pour: '/sounds/coffeePour.mp3',
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
      Object.entries(assets.spritesheets).forEach(([key, path]) => {
        window.pixi.loader.add(`${SPRITESHEET_PREFIX}_${key}`, path);
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
    const sprite = new PIXI.Sprite(resource.texture);
    return sprite;
  }

  getSpriteTexture(key) {
    return PIXI.Texture.from(assets.sprites[key]);
  }

  getAnimatedSprite(sheetKey, animationKey) {
    const resource = window.pixi.loader.resources[`${SPRITESHEET_PREFIX}_${sheetKey}`];
    const animation = new PIXI.AnimatedSprite(resource.spritesheet.animations[animationKey]);
    return animation;
  }

  getSoundSrc(key) {
    return assets.sounds[key];
  }
}
