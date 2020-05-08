import * as PIXI from 'pixi.js';
import Scene from '../Scene';

export default class IntroScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('thisIsFine');
    // Add dog sprite to center of scene
    this.dog = this.addSprite('dog', 0.5, 0.5);
    this.dog.pivot.x = this.dog.width / 2;
    this.dog.pivot.y = this.dog.height / 2;
  }

  update(delta) {
    // Rotate dog
    // Multiply by delta (time elapsed since last frame in seconds) to normalize animation
    this.dog.rotation -= 0.01 * delta;
  }
}
