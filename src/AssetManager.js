import * as PIXI from 'pixi.js';

const assets = {
  backgrounds: {
    thisIsFine: '/backgrounds/this-is-fine.jpg',
  },
};

export default class AssetManager {
  constructor(app) {
    this._app = app;
  }

  preload() {
    return new Promise((resolve, reject) => {
      Object.entries(assets.backgrounds).forEach(([key, path]) => {
        this._app.loader.add(`background_${key}`, path);
      });
      this._app.loader.onError.add(reject);
      this._app.loader.onComplete.add(resolve);
      this._app.loader.load();
    });
  }

  getBackground(key) {
    const spriteResource = this._app.loader.resources[`background_${key}`].texture;
    const sprite = new PIXI.Sprite(spriteResource);
    sprite.pivot.x = sprite.texture.width * 0.5;
    sprite.pivot.y = sprite.texture.height * 0.5;
    return sprite;
  }
}
