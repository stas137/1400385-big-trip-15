import AbstractObserver from '../utils/abstract-observer.js';
import {getRandomInteger} from '../utils/common.js';

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

  static getTypesOffers() {
    return this._offers.map((item) => item.type.toUpperCase());
  }

  static getRandomTypePoint() {
    const offers = Offers.getOffers();
    const randomIndex = getRandomInteger(0, offers.length - 1);
    return offers[randomIndex].type;
  }

  static getTypeOffers(typePoint) {
    const offersForType = Offers.getOffers().find((item) => item.type === typePoint);
    return offersForType.offers;
  }
}
