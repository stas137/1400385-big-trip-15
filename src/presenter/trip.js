import {render} from '../utils/render.js';
import TripRouteView from '../view/trip-route.js';
import TripCostView from '../view/trip-cost.js';
import TripSortView from '../view/trip-sort.js';
import TripPointsContainerView from '../view/trip-points-container.js';
/* import TripPointView from './view/trip-point.js';
import TripPointAddEditView from './view/trip-point-add-edit.js'; */
import TripPointEmptyView from '../view/trip-point-empty.js';

export default class Trip {
  constructor(tripContainer, tripControlsEvents) {
    this._tripContainer = tripContainer;
    this._tripControlsEvents = tripControlsEvents;

    this._sortComponent = new TripSortView();
    this._pointsContainerComponent = new TripPointsContainerView();
    this._pointEmptyComponent = new TripPointEmptyView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints;

    this._routeComponent = new TripRouteView();
    this._costComponent = new TripCostView();

    this._renderTrip();
  }

  _renderPointEmpty() {
    render(this._tripControlsEvents, this._pointEmptyComponent);
  }

  _renderPointsList() {

  }

  _renderTrip() {
    if (!this._tripPoints.length) {
      this._renderPointEmpty();
      return;
    }
    this._renderPointsList();
  }
}
