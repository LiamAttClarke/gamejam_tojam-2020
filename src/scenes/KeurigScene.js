import Scene from './Scene';
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
    this.clock = this.addProp(new ClockProp({ x: 300, y: 50 }));
    this.clock.sprite.width = 200;
    this.clock.sprite.height = 200;
    this.keurig = this.addProp(new KeurigProp({
      x: window.pixi.screen.width / 2 - 200,
      y: window.pixi.screen.height / 2 - 330,
      onClick: this.onKeurigClick.bind(this),
    }));
    this.keurig.sprite.width = 400;
    this.keurig.sprite.height = 660;
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
    this.backBtn = this.addProp(new BackBtnProp({
      interactive: true,
      x: 0,
      y: 0,
      onClick: this.onBackBtnClick.bind(this),
    }));
  }

  onKeurigClick() {
    if (this.keurig.isOpen) {
      this.keurig.close();
    } else {
      this.keurig.open();
    }
  }

  onBackBtnClick() {
    window.sceneManager.setScene(Scenes.Office);
  }
}
