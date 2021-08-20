import {render} from '../utils/render.js';
import TripPointView from '../view/trip-point.js';
import TripPointEditView from '../view/trip-point-edit.js';

export default class Point {
  constructor(tripPointsListContainer) {
    this._tripPointsListContainer = tripPointsListContainer;
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripPointEditComponent = new TripPointEditView(tripPoint);

    render(this._tripPointsListContainer, this._tripPointComponent);
  }
}
