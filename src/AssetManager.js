import * as PIXI from 'pixi.js';

const BACKGROUND_PREFIX = 'background';
const SPRITE_PREFIX = 'sprite';

const assets = {
  backgrounds: {
    thisIsFine: '/backgrounds/this-is-fine.jpg',
  },
  sprites: {
    dog: '/sprites/dog.png',
  },
};

export default class AssetManager {
  constructor(app) {
    this._app = app;
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
    const texture = this._app.loader.resources[`${BACKGROUND_PREFIX}_${key}`].texture;
    const background = new PIXI.Sprite(texture);
    background.pivot.x = background.texture.width * 0.5;
    background.pivot.y = background.texture.height * 0.5;
    return background;
  }

  getSprite(key) {
    const texture = this._app.loader.resources[`${SPRITE_PREFIX}_${key}`].texture;
    const sprite = new PIXI.Sprite(texture);
    return sprite;
  }
}
