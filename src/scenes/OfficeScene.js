import Scene from './Scene';
import ClockProp from '../props/ClockProp';
import MugProp from '../props/MugProp';
import KeurigProp from '../props/KeurigProp';
import { Scenes } from '../lib/SceneManager';

export default class OfficeScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('thisIsFine');
    this.addProp(new ClockProp({
      interactive: true,
      x: 500,
      y: 500,
      onClick: this.onClockClick,
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
  }

  onClockClick() {
    window.sceneManager.setScene(Scenes.Subway);
  }

  onKeurigClick() {
    window.sceneManager.setScene(Scenes.Keurig);
  }
}
