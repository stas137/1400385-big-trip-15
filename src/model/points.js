import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = points.slice();
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
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
      update,
      ...this.getPoints().slice(),
    ]);

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.setPoints([
      ...this.getPoints().slice(0, index),
      ...this.getPoints().slice(index + 1),
    ]);

    this._notify(updateType, update);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        price: point['base_price'],
      },
    );

    delete adaptedPoint['base_price'];

    return adaptedPoint;
  }
}
