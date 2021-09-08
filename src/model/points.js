import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  setPoint(pointIndex, point) {
    this._points[pointIndex] = point;
  }

  getPoints() {
    return this._points;
  }
}
