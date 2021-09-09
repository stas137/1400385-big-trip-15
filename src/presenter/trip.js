import {RenderPosition, render, remove} from '../utils/render.js';
import {compareDate, compareTime, comparePrice} from '../utils/common.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filter.js';
import TripRouteView from '../view/trip-route.js';
import TripCostView from '../view/trip-cost.js';
import TripSortView from '../view/trip-sort.js';
import TripPointsContainerView from '../view/trip-points-container.js';
import TripPointEmptyView from '../view/trip-point-empty.js';
import TripPointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer, tripControlsEvents, tripPointsModel, tripFilterModel) {

    this._tripPointsModel = tripPointsModel;
    this._tripFilterModel = tripFilterModel;

    this._tripContainer = tripContainer;
    this._tripControlsEvents = tripControlsEvents;

    this._tripPointsPresenter = new Map();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointEmptyComponent = new TripPointEmptyView();
  }

  init() {
    this._activeFilter = FilterType.EVERYTHING;
    this._activeSort = SortType.DAY;

    this._tripPointsModel.addObserver(this._handleModelEvent);
    this._tripFilterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  _handleViewAction(actionType, updateType, data) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._tripPointsModel.updatePoint(updateType, data);
        break;
      case UserAction.ADD_POINT:
        this._tripPointsModel.addPoint(updateType, data);
        break;
      case UserAction.DELETE_POINT:
        this._tripPointsModel.deletePoint(updateType, data);
        break;
    }

  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._tripPointsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripPoints();
        this._renderTripPointsList();
        break;
      case UpdateType.MAJOR:
        break;
    }

  }

  _getTripPoints(activeSort = SortType.DAY) {

    this._activeSort = activeSort;
    this._activeFilter = this._tripFilterModel.getFilter();
    const points = this._tripPointsModel.getPoints();
    const filteredPoints = filter[this._activeFilter](points);


    switch (this._activeSort) {
      case SortType.DAY:
        return filteredPoints.slice().sort(compareDate);
      case SortType.TIME:
        return filteredPoints.slice().sort(compareTime);
      case SortType.PRICE:
        return filteredPoints.slice().sort(comparePrice);
    }

    return filteredPoints;
  }

  _setTripPoint(updatedItem) {
    this._tripPointsModel.updatePoint('update', updatedItem);
  }

  _handleSortTypeChange(activeSort) {

    if (activeSort === this._activeSort || activeSort === SortType.EVENT || activeSort === SortType.OFFER) {
      return;
    }

    this._activeSort = activeSort;

    this._clearTripPoints();
    this._clearTripPointsContainer();
    this._clearSort();

    this._renderSort(this._activeSort);
    this._renderTripPointsContainer();
    this._renderTripPointsList(this._activeSort);
  }

  _handleModeChange() {
    this._tripPointsPresenter.forEach((tripPointPresenter) => tripPointPresenter.resetView());
  }

  _renderSort(activeSort) {
    this._sortComponent = new TripSortView(activeSort);
    this._sortComponent.setSortClickHandler(this._handleSortTypeChange);
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

    const tripPointPresenter = new TripPointPresenter(this._tripPointsListContainer, this._handleModeChange, this._handleViewAction);

    tripPointPresenter.init(tripPoint);
    this._tripPointsPresenter.set(tripPoint.id, tripPointPresenter);
  }

  _renderTripPointsList(activeSort) {
    this._getTripPoints(activeSort).forEach((tripPoint) => this._renderTripPoint(tripPoint));
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
