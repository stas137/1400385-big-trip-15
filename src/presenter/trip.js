import {RenderPosition, render} from '../utils/render.js';
import {compareDate, compareTime, comparePrice, updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
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

    this._currentSortType = SortType.DAY;

    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFavoriteChange = this._handleFavoriteChange.bind(this);

    this._pointEmptyComponent = new TripPointEmptyView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._tripPointsDefault = tripPoints.slice();
    this._renderTrip();
  }

  _handleSortChange(sortType) {

    if (sortType === this._currentSortType) {
      return;
    }

    this._sortTripPoints(sortType);
    this._clearTripPoints();
    this._renderTripPointsList();
  }

  _handleModeChange() {
    this._tripPointsPresenter.forEach((tripPointPresenter) => tripPointPresenter.resetView());
  }

  _handleFavoriteChange(updatedTripPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedTripPoint);
    this._tripPointsPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  }

  _sortTripPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._tripPoints.sort(compareDate);
        break;
      case SortType.TIME:
        this._tripPoints.sort(compareTime);
        break;
      case SortType.PRICE:
        this._tripPoints.sort(comparePrice);
        break;
      default:
        this._tripPoints = this._tripPointsDefault.slice();
    }

    this._currentSortType = sortType;
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
    this._sortComponent.setSortClickHandler(this._handleSortChange);

    this._tripControlsMain = this._tripContainer.querySelector('.trip-main');

    render(this._tripControlsMain, this._routeComponent, RenderPosition.AFTERBEGIN);

    this._tripControlsInfo = this._tripContainer.querySelector('.trip-info');

    render(this._tripControlsInfo, this._costComponent);
    render(this._tripControlsEvents, this._sortComponent);

    this._tripPointsContainerComponent = new TripPointsContainerView();
    render(this._tripControlsEvents, this._tripPointsContainerComponent);

    this._renderTripPointsList();
  }

  _clearTripPoints() {
    this._tripPointsPresenter.forEach((tripPointPresenter) => tripPointPresenter.destroy());
    this._tripPointsPresenter.clear();
  }
}
