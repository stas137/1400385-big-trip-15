import {RenderPosition, render} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import TripRouteView from '../view/trip-route.js';
import TripCostView from '../view/trip-cost.js';
import TripSortView from '../view/trip-sort.js';
import TripPointsContainerView from '../view/trip-points-container.js';
import TripPointEmptyView from '../view/trip-point-empty.js';
import TripPointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer, tripControlsEvents) {

    this._tripContainer = tripContainer;
    this._tripControlsEvents = tripControlsEvents;
    this._tripPointsPresenter = new Map();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFavoriteChange = this._handleFavoriteChange.bind(this);

    this._pointEmptyComponent = new TripPointEmptyView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints;
    this._renderTrip();
  }

  _handleModeChange() {
    this._tripPointsPresenter.forEach((tripPointPresenter) => tripPointPresenter.resetView());
  }

  _handleFavoriteChange(updatedTripPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedTripPoint);
    this._tripPointsPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  }

  _renderPointEmpty() {
    render(this._tripControlsEvents, this._pointEmptyComponent);
  }

  _renderTripPoint(tripPoint) {
    this._tripPointsListContainer = this._tripContainer.querySelector('.trip-events__list');

    const tripPointPresenter = new TripPointPresenter(this._tripPointsListContainer, this._handleModeChange, this._handleFavoriteChange);

    tripPointPresenter.init(tripPoint);
    this._tripPointsPresenter.set(tripPoint.id, tripPointPresenter);
  }

  _renderTripPointsList() {
    this._tripPointsContainerComponent = new TripPointsContainerView();

    render(this._tripControlsEvents, this._tripPointsContainerComponent);

    this._tripPoints.forEach((tripPoint) => this._renderTripPoint(tripPoint));
  }

  _renderTrip() {
    if (!this._tripPoints.length) {
      this._renderPointEmpty();
      return;
    }

    this._routeComponent = new TripRouteView(this._tripPoints);
    this._costComponent = new TripCostView(this._tripPoints);
    this._sortComponent = new TripSortView();

    this._tripControlsMain = this._tripContainer.querySelector('.trip-main');

    render(this._tripControlsMain, this._routeComponent, RenderPosition.AFTERBEGIN);

    this._tripControlsInfo = this._tripContainer.querySelector('.trip-info');

    render(this._tripControlsInfo, this._costComponent);
    render(this._tripControlsEvents, this._sortComponent);

    this._renderTripPointsList();
  }
}
