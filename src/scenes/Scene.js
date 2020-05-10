import * as PIXI from 'pixi.js';
import { Howl } from 'howler';
import { GlowFilter } from '@pixi/filter-glow';
import { getFillDimensions } from '../lib/Helpers';
import HandProp, { HandState } from '../props/HandProp';
import ConsumeIconProp from '../props/ConsumeIconProp';
import { Scenes } from '../lib/SceneManager';

const glowFilter = new GlowFilter();
const Layer = {
  Cursor: 999,
  GUI: 998,
}

// Abstract Scene Class
export default class Scene {

  constructor() {
    this._container = null;
    this._background = null;
    this._lastScreenWidth = window.pixi.screen.width;
    this._lastScreenHeight = window.pixi.screen.height;
    this._hand = null;
    this._consumeIcon = null;
    this.itemInHand = null;
    this.props = [];
  }

  /** Initialize your scene */
  setup() {
    this._container = new PIXI.Container();
    // Sort children by zIndex
    this._container.sortableChildren = true;
    window.pixi.stage.addChild(this._container);
    // Add hand cursor
    this._hand = new HandProp();
    this._hand.sprite.x = -100000;
    this._hand.sprite.y = -100000;
    this._hand.sprite.zIndex = Layer.Cursor;
    this._container.addChild(this._hand.sprite);
    // Add consume icon
    this._consumeIcon = this.addProp(new ConsumeIconProp({
      x: (window.pixi.screen.width / 2) - 70,
      y: window.pixi.screen.height - 138,
    }));
    this._consumeIcon.sprite.zIndex = Layer.GUI;
    // only visible when holding consumable
    this._consumeIcon.sprite.visible = false;
    this._container.addChild(this._consumeIcon.sprite);
    // Enable scene interactivity
    this._container.interactive = true;
    this._container.on('mousemove', this.onPointerMove.bind(this));
    this._container.on('click', this.onPointerClick.bind(this));
  }

  /**
   * Update Loop that runs every frame
   * @param {Number} delta time elapsed since last frame (seconds)
   */
  update(delta) {
    this.props.forEach((prop) => {
      if (!prop.static) prop.update(delta);
    });
  }

  /** Called before switching to next Scene */
  destroy() {
    window.pixi.stage.removeChild(this._container);
  }

  setBackground(backgroundKey) {
    const background = window.assetManager.getBackground(backgroundKey);
    const { width: screenWidth, height: screenHeight } = window.pixi.screen;
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

  addProp(propInstance) {
    if (propInstance.interactive) {
      propInstance.sprite.on('mouseover', (event) => this.onPropPointerOver(event, propInstance));
      propInstance.sprite.on('mouseout', (event) => this.onPropPointerLeave(event, propInstance));
      propInstance.sprite.on('click', (event) => this.onPropClick(event, propInstance));
    }
    this._container.addChild(propInstance.sprite);
    this.props.push(propInstance);
    return propInstance;
  }

  removeProp(prop) {
    prop.destroy();
    prop.sprite.parent.removeChild(prop.sprite);
    const propIndex = this.props.indexOf(prop);
    this.props.slice(propIndex, 1);
  }

  setFire() {
    this.props.forEach((prop) => {
      if (!prop.isOnFire) {
        prop.setInteractive(false);
        prop.setFire(true);
      }
    });
    new Howl({
      src: window.assetManager.getSoundSrc('end'),
    }).play();
    setTimeout(() => {
      window.sceneManager.setScene(Scenes.Credits);
    }, 8000);
  }

  onPointerMove(event) {
    this._hand.sprite.position = event.data.getLocalPosition(this._container);
  }

  onPointerClick(event) {
    if (this._hand.propInHand) {
      this._hand.release();
      this._consumeIcon.sprite.visible = false;
    }
  }

  onPropPointerOver(event, prop) {
    prop.sprite.filters = [glowFilter];
    if (!this._hand.propInHand) {
      this._hand.setState(HandState.Pointing);
    }
  }

  onPropPointerLeave(event, prop) {
    prop.sprite.filters = [];
    if (!this._hand.propInHand) {
      this._hand.setState(HandState.Idle);
    }
  }

  onPropClick(event, prop) {
    event.stopPropagation();
    if (prop === this._consumeIcon && this._hand.propInHand) {
      const delConsumable = this._hand.propInHand.consume();
      if (delConsumable) {
        this._hand.release();
        this.removeProp(releasedProp);
      }
      this._consumeIcon.sprite.visible = false;
    } else if (prop.draggable) {
      this._hand.grab(prop);
      if (prop.consumable) {
        this._consumeIcon.sprite.visible = true;
      }
      prop.onGrab();
    } else if (prop.interactive) {
      prop.onClick(event, this._hand.propInHand, () => {
        const releasedItem = this._hand.release();
        this.removeProp(releasedItem);
      });
    }
  }
}
