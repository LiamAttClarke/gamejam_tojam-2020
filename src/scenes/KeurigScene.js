import Scene from './Scene';
import ClockProp from '../props/ClockProp';
import MugProp from '../props/MugProp';
import KeurigProp from '../props/KeurigProp';
import PodProp from '../props/PodProp';
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
    }));
    this.mug = this.addProp(new MugProp({
      interactive: true,
      x: 1150,
      y: 550,
    }));
    this.pod = this.addProp(new PodProp({
      interactive: true,
      x: 1000,
      y: 550,
    }));
    this.pod.sprite.width = 100;
    this.pod.sprite.height = 100;
    this.keurig.sprite.width = 400;
    this.keurig.sprite.height = 660;
  }

  onKeurigClick() {
    if (this.keurig.isOpen) {
      this.keurig.close();
    } else {
      this.keurig.open();
    }
  }
}
