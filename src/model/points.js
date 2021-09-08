import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  setPoint(point) {
    if (!point) {
      return;
    }
    const index = this._points.findIndex((item) => item.id === point.id);
    this.setPoints([
      this.getPoints().slice(0, index),
      point,
      this.getPoints().slice(index + 1),
    ],
    );
  }

  getPoints() {
    return this._points;
  }
}
