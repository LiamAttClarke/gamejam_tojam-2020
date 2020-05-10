import Scene from './Scene';
import { Howl } from 'howler';
import ClockProp from '../props/ClockProp';
import MugProp from '../props/MugProp';
import KeurigProp from '../props/KeurigProp';
import { Scenes } from '../lib/SceneManager';

export default class OfficeScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('computer');
    this.clock = this.addProp(new ClockProp({ x: 300, y: 50 }));
    this.clock.sprite.width = 200;
    this.clock.sprite.height = 200;
    this.keurig = this.addProp(new KeurigProp({
      x: window.pixi.screen.width / 2 - 200,
      y: window.pixi.screen.height / 2 - 330,
      onClick: this.onKeurigClick.bind(this),
      onPour: this.onKeurigPour.bind(this),
    }));
    this.mug = this.addProp(new MugProp({
      interactive: true,
      x: 1000,
      y: 500,
      onClick: this.onMugClick.bind(this),
    }));
    this.keurig.sprite.width = 400;
    this.keurig.sprite.height = 660;
    this.isCupInKeurig = false;
  }

  onKeurigClick(event, propInHand) {
    if (propInHand) {
      if (propInHand === this.mug) {
        window.sceneManager.activeScene._hand.release();
        // nudging the cup into the right spot relative to keurig position...
        propInHand.sprite.x = this.keurig.sprite.x + (this.keurig.sprite.width / 2) - (propInHand.sprite.width / 2) + 25;
        propInHand.sprite.y = this.keurig.sprite.y + 450;
        this.isCupInKeurig = true;
      } // else if this.pod
    } else {
      if (this.keurig.isOpen) {
        this.keurig.close();
        if (this.isCupInKeurig) {
          this.keurig.activate();
        }
      } else {
        this.keurig.open();
      }
    }
  }

  onKeurigPour() {
    if (this.isCupInKeurig) {
      this.mug.fill();
    }
  }

  onMugClick() {
    this.isCupInKeurig = false;
  }
}
