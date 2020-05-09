import Scene from './Scene';
import ClockProp from '../props/ClockProp';
import MugProp from '../props/MugProp';
import { Scenes } from '../lib/SceneManager';

export default class OfficeScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('thisIsFine');
    this.addProp('clock', new ClockProp({
      interactive: true,
      onClick: this.onClockClick,
    }), 0.6, 0.35);
    this.mug = this.addProp('mug', new MugProp({
      interactive: true,
      full: true,
      onClick: this.onMugClick.bind(this),
    }), 0.65, 0.5);
    this.mug.root.width = 128;
    this.mug.root.height = 128;
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
