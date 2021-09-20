import AbstractObserver from '../utils/abstract-observer.js';
import {getDuration, getDurationTripPoint} from '../utils/common.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this.getPoints().slice(0, index),
      update,
      ...this.getPoints().slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this.getPoints().slice(),
    ];

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

    const destination = Object.assign(
      {},
      point['destination'],
      {
        city: point['destination']['name'],
      },
    );

    delete destination['name'];

    const {
      durationDays,
      durationHours,
      durationMinutes,
    } = getDuration(point['date_from'], point['date_to']);

    const adaptedPoint = Object.assign(
      {},
      point,
      {
        typePoint: point['type'],
        cityPoint: destination['city'],
        startDateTime: point['date_from'],
        endDateTime: point['date_to'],
        duration: getDurationTripPoint(durationDays, durationHours, durationMinutes),
        price: point['base_price'],
        pointOffers: point['offers'],
        destination: destination,
        isFavorite: point['is_favorite'],
      },
    );

    delete adaptedPoint['type'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['offers'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  static adaptToServer(point) {

    const destination = Object.assign(
      {},
      point['destination'],
      {
        'name': point['destination']['city'],
      },
    );

    delete destination['city'];

    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'type': point.typePoint,
        'date_from': point.startDateTime,
        'date_to': point.endDateTime,
        'base_price': Number(point.price),
        'offers': point.pointOffers,
        'destination': destination,
        'is_favorite': point.isFavorite,
      },
    );

    delete adaptedPoint['typePoint'];
    delete adaptedPoint['cityPoint'];
    delete adaptedPoint['startDateTime'];
    delete adaptedPoint['endDateTime'];
    delete adaptedPoint['duration'];
    delete adaptedPoint['price'];
    delete adaptedPoint['pointOffers'];
    delete adaptedPoint['isFavorite'];

    return adaptedPoint;
  }
}
