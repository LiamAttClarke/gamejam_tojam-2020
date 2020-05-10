import Scene from './Scene';
import ClockProp from '../props/ClockProp';

export default class IntroScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('thisIsFine');
    this.addProp(new ClockProp({
      interactive: true,
      onClick: this.onClockClick,
    }));
  }

  onClockClick() {
    console.log('You clicked a clock.')
  }
}
