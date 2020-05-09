import Scene from './Scene';
import ClockProp from '../props/ClockProp';

export default class IntroScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('thisIsFine');
    this.addProp('clock', new ClockProp({
      interactive: true,
      onClick: this.onClockClick,
    }), 0.6, 0.35);
  }

  onClockClick() {
    console.log('You clicked a clock.')
  }
}
