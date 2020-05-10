import IntroScene from '../scenes/IntroScene';
import OfficeScene from '../scenes/OfficeScene';
import KeurigScene from '../scenes/KeurigScene';
import SubwayScene from '../scenes/SubwayScene';
import ComputerScene from '../scenes/ComputerScene';
import CreditScene from '../scenes/CreditScene';
import SupermarketScene from '../scenes/SupermarketScene';

export const Scenes = {
  Intro: IntroScene,
  Office: OfficeScene,
  Keurig: KeurigScene,
  Computer: ComputerScene,
  Subway: SubwayScene,
  Credits: CreditScene,
  Supermarket: SupermarketScene,
};

export default class SceneManager {

  constructor() {
    this.activeScene = null;
  }

  async setScene(scene) {
    if (this.activeScene) {
      window.pixi.ticker.remove(this._onTick);
      this.activeScene.destroy();
    }
    this.activeScene = new scene();
    this.activeScene.setup();
    window.pixi.ticker.add(this._onTick.bind(this));
  }

  _onTick(delta) {
    this.activeScene.update(delta);
    // Update global clock
    window.state.tick(delta);
  }
}
