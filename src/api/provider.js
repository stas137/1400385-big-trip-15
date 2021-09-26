import PointsModel from '../model/points.js';
import {isOnline} from '../utils/common.js';

const getSyncedPoints = (points) => {
  points
    .filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  items
    .reduce((acc, current) => Object.assign({}, acc, {
      [current.id]: current,
    }), {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setItems(items);
          return points;
        });
    }

    const pointsStore = Object.values(this._store.getItems());

    return Promise.resolve(pointsStore.map(PointsModel.adaptToClient));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations.map((destination) => destination));
          this._store.setItems(items);
          return destinations;
        });
    }

    const destinationsStore = Object.values(this._store.getItems());

    return Promise.resolve(destinationsStore.map((destination) => destination));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers.map((offer) => offer));
          this._store.setItems(items);
          return offers;
        });
    }

    const offersStore = Object.values(this._store.getItems());

    return Promise.resolve(offersStore.map((offer) => offer));
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((responce) => {
          const createdPoints = getSyncedPoints(responce.created);
          const updatedPoints = getSyncedPoints(responce.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
