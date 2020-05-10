import Scene from './Scene';
import ClockProp from '../props/ClockProp';
import BackBtnProp from '../props/backBtnProp';
import { Scenes } from '../lib/SceneManager';
import ComputerProp from '../props/ComputerProp';

export default class ComputerScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('computer');
    this.clock = this.addProp(new ClockProp({ x: 300, y: 50 }));
    this.clock.sprite.width = 200;
    this.clock.sprite.height = 200;
    this.computer = this.addProp(new ComputerProp({ x: 450, y: 150 }));
    this.computer.sprite.width = 512;
    this.computer.sprite.height = 512;
    this.backBtn = this.addProp(new BackBtnProp({
      interactive: true,
      x: 0,
      y: 0,
      onClick: this.onBackBtnClick.bind(this),
    }));
  }

  onBackBtnClick() {
    window.sceneManager.setScene(Scenes.Office);
  }
}
