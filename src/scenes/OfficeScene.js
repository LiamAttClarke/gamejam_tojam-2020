import Scene from './Scene';
import ClockProp from '../props/ClockProp';
import MugProp from '../props/MugProp';
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
      onClick: this.onMugClick.bind(this),
    }));
  }

  onClockClick() {
    window.sceneManager.setScene(Scenes.Subway);
  }

  onMugClick() {
    if (this.mug.isFull) {
      this.mug.empty();
      window.pixi.ticker.speed += 10;
    }
  }
}
