import Scene from './Scene';
import ClockProp from '../props/ClockProp';
import MugProp from '../props/MugProp';
import KeurigProp from '../props/KeurigProp';
import ComputerProp from '../props/ComputerProp';
import { Scenes } from '../lib/SceneManager';

export default class OfficeScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('thisIsFine');
    this.clock = this.addProp(new ClockProp({
      interactive: true,
      x: 900,
      y: 250,
      onClick: this.onClockClick.bind(this),
    }));
    this.mug = this.addProp(new MugProp({
      interactive: true,
      full: true,
      x: 500,
      y: 500,
    }));
    this.keurig = this.addProp(new KeurigProp({
      x: 600,
      y: 200,
      onClick: this.onKeurigClick,
    }));
    this.keurig.sprite.width = 200;
    this.keurig.sprite.height = 330;
    this.computer = this.addProp(new ComputerProp({
      interactive: true,
      x: 300,
      y: 300,
      onClick: this.onComputerClick.bind(this),
    }));
  }

  onClockClick() {
    this.setFire();
    // window.sceneManager.setScene(Scenes.Subway);
  }

  onKeurigClick() {
    window.sceneManager.setScene(Scenes.Keurig);
  }

  onComputerClick() {
    window.sceneManager.setScene(Scenes.Computer);
  }
}
