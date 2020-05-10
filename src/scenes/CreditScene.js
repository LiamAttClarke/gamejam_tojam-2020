import Scene from './Scene';
import { Scenes } from '../lib/SceneManager';
import BackBtnProp from '../props/backBtnProp';

export default class CreditScene extends Scene {

  setup() {
    super.setup();
    this.setBackground('credits');
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