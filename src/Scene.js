import * as PIXI from 'pixi.js';
import { getFillDimensions } from './lib/Helpers';

// Abstract Scene Class
export default class Scene {

  constructor(app, sceneManager, assetManager) {
    this._app = app;
    this._sceneManager = sceneManager;
    this._assetManager = assetManager;
    this._container = new PIXI.Container();
    this._background = null;
    this._lastScreenWidth = this._app.screen.width;
    this._lastScreenHeight = this._app.screen.height;
  }

  /** Initialize your scene */
  setup() {
    this._app.stage.addChild(this._container);
  }

  /**
   * Update Loop that runs every frame
   * @param {Number} delta time elapsed since last frame (seconds)
   */
  update() {}

  /** Called before switching to next Scene */
  destroy() {
    this._app.stage.removeChild(this._container);
  }

  setBackground(backgroundKey) {
    const background = this._assetManager.getBackground(backgroundKey);
    const { width: screenWidth, height: screenHeight } = this._app.screen;
    const { width: bgWidth, height: bgHeight } = getFillDimensions(
      screenWidth,
      screenHeight,
      background.width,
      background.height
    );
    background.x = screenWidth / 2;
    background.y = screenHeight / 2;
    background.width = bgWidth;
    background.height = bgHeight;
    this._container.addChild(background);
    // Remove previous background after adding new one
    if (this._background) {
      this._container.removeChild(this._background);
    }
    this._background = background;
  }

  addSprite(spriteKey, x = 0, y = 0) {
    const sprite = this._assetManager.getSprite(spriteKey);
    sprite.x = this._app.screen.width * x;
    sprite.y = this._app.screen.height * y;
    this._container.addChild(sprite);
    return sprite;
  }

  onResize() {
    const { width: screenWidth, height: screenHeight } = this._app.screen;
    if (this._background) {
      const { width: bgWidth, height: bgHeight } = getFillDimensions(
        screenWidth,
        screenHeight,
        this._background.texture.width,
        this._background.texture.height
      );
      this._background.x = screenWidth / 2;
      this._background.y = screenHeight / 2;
      this._background.width = bgWidth;
      this._background.height = bgHeight;
    }
    // Reposition all other sprites
    this._container.children.forEach((child) => {
      if (child !== this._background) {
        const xPercent = child.x / this._lastScreenWidth;
        const yPercent = child.y / this._lastScreenHeight;
        child.x = screenWidth * xPercent;
        child.y = screenHeight * yPercent;
      }
    });
    // Update last known screen dimensions
    this._lastScreenWidth = screenWidth;
    this._lastScreenHeight = screenHeight;
  }
}
