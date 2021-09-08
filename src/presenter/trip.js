import {RenderPosition, render, remove} from '../utils/render.js';
import {compareDate, compareTime, comparePrice, compareFuture, comparePast} from '../utils/common.js';
import {FilterType, SortType} from '../const.js';
import TripRouteView from '../view/trip-route.js';
import TripCostView from '../view/trip-cost.js';
import TripSortView from '../view/trip-sort.js';
import TripPointsContainerView from '../view/trip-points-container.js';
import TripPointEmptyView from '../view/trip-point-empty.js';
import TripPointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer, tripControlsEvents, tripPointsModel) {

    this._tripPointsModel = tripPointsModel;

    this._tripContainer = tripContainer;
    this._tripControlsEvents = tripControlsEvents;
    this._tripPointsPresenter = new Map();

    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFavoriteChange = this._handleFavoriteChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._pointEmptyComponent = new TripPointEmptyView();
  }

  init(activeSort = SortType.DAY, activeFilter = FilterType.EVERYTHING) {
    this._activeSort = activeSort;
    this._activeFilter = activeFilter;
    this._renderTrip();
  }

  _getTripPoints(activeSort = SortType.DAY, activeFilter = FilterType.EVERYTHING) {

    this._activeSort = activeSort;
    this._activeFilter = activeFilter;

    if (this._activeFilter !== FilterType.EVERYTHING) {
      switch (this._activeFilter) {
        case FilterType.FUTURE:
          return this._tripPointsModel.getPoints().slice().sort(compareFuture);
        case FilterType.PAST:
          return this._tripPointsModel.getPoints().slice().sort(comparePast);
      }
    }

    switch (this._activeSort) {
      case SortType.DAY:
        return this._tripPointsModel.getPoints().slice().sort(compareDate);
      case SortType.TIME:
        return this._tripPointsModel.getPoints().slice().sort(compareTime);
      case SortType.PRICE:
        return this._tripPointsModel.getPoints().slice().sort(comparePrice);
    }

    return this._tripPointsModel.getPoints();
  }

  _setTripPoint(updatedItem) {
    this._tripPointsModel.updatePoint('update', updatedItem);
  }

  _handleSortChange(activeSort) {

    if (activeSort === this._activeSort || activeSort === SortType.EVENT || activeSort === SortType.OFFER) {
      return;
    }

    this._activeSort = activeSort;

    this._clearTripPoints();
    this._clearTripPointsContainer();
    this._clearSort();

    this._renderSort(this._activeSort);
    this._renderTripPointsContainer();
    this._renderTripPointsList();
  }

  _handleModeChange() {
    this._tripPointsPresenter.forEach((tripPointPresenter) => tripPointPresenter.resetView());
  }

  _handleFavoriteChange(updatedTripPoint) {
    this._setTripPoint(updatedTripPoint);
    this._tripPointsPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  }

  _handleFormSubmit(updatedTripPoint) {
    this._setTripPoint(updatedTripPoint);
    this._tripPointsPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  }

  _renderSort(activeSort) {
    this._sortComponent = new TripSortView(activeSort);
    this._sortComponent.setSortClickHandler(this._handleSortChange);
    render(this._tripControlsEvents, this._sortComponent);
  }

  _renderTripPointsContainer() {
    this._tripPointsContainerComponent = new TripPointsContainerView();
    render(this._tripControlsEvents, this._tripPointsContainerComponent);
  }

  _renderPointEmpty() {
    render(this._tripControlsEvents, this._pointEmptyComponent);
  }

  _renderTripPoint(tripPoint) {
    this._tripPointsListContainer = this._tripContainer.querySelector('.trip-events__list');

    const tripPointPresenter = new TripPointPresenter(this._tripPointsListContainer, this._handleModeChange, this._handleFavoriteChange, this._handleFormSubmit);

    tripPointPresenter.init(tripPoint);
    this._tripPointsPresenter.set(tripPoint.id, tripPointPresenter);
  }

  _renderTripPointsList(activeFilter = FilterType.EVERYTHING) {
    this._activeFilter = activeFilter;
    this._getTripPoints().forEach((tripPoint) => this._renderTripPoint(tripPoint));
  }

  _renderTrip() {
    if (!this._getTripPoints().length) {
      this._renderPointEmpty();
      return;
    }

    this._routeComponent = new TripRouteView(this._getTripPoints());
    this._costComponent = new TripCostView(this._getTripPoints());

    this._tripControlsMain = this._tripContainer.querySelector('.trip-main');
    render(this._tripControlsMain, this._routeComponent, RenderPosition.AFTERBEGIN);

    this._tripControlsInfo = this._tripContainer.querySelector('.trip-info');
    render(this._tripControlsInfo, this._costComponent);

    this._renderSort(this._activeSort);
    this._renderTripPointsContainer();
    this._renderTripPointsList();
  }

  _clearTripPoints() {
    this._tripPointsPresenter.forEach((tripPointPresenter) => tripPointPresenter.destroy());
    this._tripPointsPresenter.clear();
  }

  _clearSort() {
    remove(this._sortComponent);
  }

  _clearTripPointsContainer() {
    remove(this._tripPointsContainerComponent);
  }
}
