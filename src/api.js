import PointsModel from './model/points.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const SuccessStatusHTTPRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: 'points'})
      .then(Api.toJSON)
      .then((points) => points.map((point) => PointsModel.adaptToClient(point)));
  }

  getDestinations() {
    return this._load({url: 'destinations'})
      .then(Api.toJSON);
  }

  getOffers() {
    return this._load({url: 'offers'})
      .then(Api.toJSON);
  }

  updatePoints(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(responce) {
    if (responce.status < SuccessStatusHTTPRange.MIN || responce.status > SuccessStatusHTTPRange.MAX) {
      throw new Error(`${responce.status}: ${responce.statusText}`);
    }

    return responce;
  }

  static toJSON(responce) {
    return responce.json();
  }

  static catchError(err) {
    throw err;
  }
}
