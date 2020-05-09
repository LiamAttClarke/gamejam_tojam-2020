import moment from 'moment';

export default class State {
  constructor() {
    // TODO: get local time in milliseconds instead of utc
    this.timeElapsed = Date.now(); // milliseconds
  }

  tick(delta) {
    this.timeElapsed += delta;
  }
}
