import AbstractObserver from '../utils/abstract-observer.js';

export default class Destinations extends AbstractObserver {
  constructor() {
    super();
    this._destinations = null;
  }

  static setDestinations(destinations) {
    this._destinations = destinations;
  }

  static getDestinations() {
    return this._destinations;
  }
}
