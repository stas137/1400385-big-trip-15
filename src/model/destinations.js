import AbstractObserver from '../utils/abstract-observer.js';
import {getRandomInteger} from '../utils/common.js';

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

  static getRandomCityPoint() {
    const destinations = Destinations.getDestinations();
    const randomIndex = getRandomInteger(0, destinations.length - 1);
    return destinations[randomIndex].name;
  }

  static getCityDestination(cityPoint) {

    let destination = Destinations.getDestinations().find((item) => item.name === cityPoint);

    destination = Object.assign(
      {},
      destination,
      {
        city: destination['name'],
      },
    );

    delete destination['name'];

    return destination;
  }
}
