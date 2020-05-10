import Scene from './Scene';
import ClockProp from '../props/ClockProp';
import { Scenes } from '../lib/SceneManager';
import ComputerProp from '../props/ComputerProp';
import SupermarketItemProp from '../props/SupermarketItemProp';

export default class SupermarketScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('supermarket');

    const items = ['gansito', 'soda', 'toiletPaper', 'flour', 'bananas', 'carrots', 'wine', 'raspberries'];

    items.forEach((item, index) => {
      const column = Math.floor(index / 6);
      const row = index >= 6 ? index - 6 * column : index;

      this[item] = this.addProp(new SupermarketItemProp({
        itemName: item,
        x: 200 * row,
        y: 200 * column,
        onClick: this.onItemClick.bind(this)
      }));

      this[item].sprite.width = 200;
      this[item].sprite.height = 200;
    });

  }

  onItemClick(info) {
    console.log(info);

  }
}
