import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.setPoints([
      ...this.getPoints().slice(0, index),
      update,
      ...this.getPoints().slice(index + 1),
    ]);

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.setPoints([
      ...this.getPoints().slice(),
      update,
    ]);

    this._notify(updateType, update);
  }

  getPoints() {
    return this._points;
  }
}
