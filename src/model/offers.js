import AbstractObserver from '../utils/abstract-observer.js';

export default class Offers extends AbstractObserver {
  constructor() {
    super();
    this._offers = null;
  }

  static setOffers(offers) {
    this._offers = offers;
  }

  static getOffers() {
    return this._offers;
  }
}
