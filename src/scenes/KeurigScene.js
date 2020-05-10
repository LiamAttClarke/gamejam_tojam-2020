import Scene from './Scene';
import { Howl } from 'howler';
import ClockProp from '../props/ClockProp';
import MugProp from '../props/MugProp';
import KeurigProp from '../props/KeurigProp';
import PodProp from '../props/PodProp';
import BackBtnProp from '../props/backBtnProp';
import { Scenes } from '../lib/SceneManager';

export default class OfficeScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('computer');
    this.backBtn = this.addProp(new BackBtnProp({
      interactive: true,
      x: 0,
      y: 0,
      onClick: this.onBackBtnClick.bind(this),
    }));
    this.clock = this.addProp(new ClockProp({ x: 300, y: 50 }));
    this.clock.sprite.width = 200;
    this.clock.sprite.height = 200;
    this.keurig = this.addProp(new KeurigProp({
      x: window.pixi.screen.width / 2 - 200,
      y: window.pixi.screen.height / 2 - 330,
      onClick: this.onKeurigClick.bind(this),
      onPour: this.onKeurigPour.bind(this),
    }));
    this.keurig.sprite.width = 400;
    this.keurig.sprite.height = 660;
    this.mug = this.addProp(new MugProp({
      interactive: true,
      x: 1150,
      y: 550,
      onGrab: this.onMugGrab.bind(this),
    }));
    this.addProp(new PodProp({
      interactive: true,
      x: 100,
      y: 600,
    }));
    this.addProp(new PodProp({
      interactive: true,
      x: 200,
      y: 600,
    }));
    this.addProp(new PodProp({
      interactive: true,
      x: 150,
      y: 525,
    }));

    this.isCupInKeurig = false;
  }

  onKeurigClick(event, propInHand, destroyItem) {
    if (propInHand) {
      if (propInHand === this.mug) {
        window.sceneManager.activeScene._hand.release();
        // nudging the cup into the right spot relative to keurig position...
        propInHand.sprite.x = this.keurig.sprite.x + (this.keurig.sprite.width / 2) - (propInHand.sprite.width / 2) + 25;
        propInHand.sprite.y = this.keurig.sprite.y + 450;
        this.isCupInKeurig = true;
      } else if ((propInHand instanceof PodProp) && this.keurig.isOpen && !this.keurig.hasPod) {
        this.keurig.addPod();
        destroyItem();
      }
    } else {
      if (this.keurig.isOpen) {
        this.keurig.close();
        if (this.isCupInKeurig && this.keurig.hasPod) {
          if (this.mug.consumable) { // already full of coffee
            this.mug.setFire();
          }
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

  onMugGrab() {
    this.isCupInKeurig = false;
    if (this.keurig.pouring) {
      this.keurig.setFire();
    }
  }

  onBackBtnClick() {
    window.sceneManager.setScene(Scenes.Office);
  }
}
