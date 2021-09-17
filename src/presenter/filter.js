import {remove, render, replace} from '../utils/render.js';
import {FilterType, UpdateType} from '../const.js';
import TripFilterView from '../view/trip-filter.js';

export default class Filter {
  constructor(tripFilterContainer, tripFilterModel, tripPointsModel) {

    this._tripFilterModel = tripFilterModel;
    this._tripPointsModel = tripPointsModel;

    this._isLoading = true;
    this._isLoadedAdditionalData = false;

    this._tripFilterComponent = null;
    this._tripFilterContainer = tripFilterContainer;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripFilterModel.addObserver(this._handleModelEvent);
    this._tripPointsModel.addObserver(this._handleModelEvent);
  }

  init(isLoading = false, isLoadedAdditionalData = true) {

    this._isLoading = isLoading;
    this._isLoadedAdditionalData = isLoadedAdditionalData;

    const filters = this._getFilters();
    this._activeFilter = this._tripFilterModel.getFilter();

    this._prevFilterComponent = this._tripFilterComponent;

    this._tripFilterComponent = new TripFilterView(filters, this._activeFilter, this._isLoading, this._isLoadedAdditionalData);
    this._tripFilterComponent.setFilterClickHandler(this._handleFilterTypeChange);

    if (this._prevFilterComponent === null) {
      render(this._tripFilterContainer, this._tripFilterComponent);
      return;
    }

    replace(this._tripFilterComponent, this._prevFilterComponent);
    remove(this._prevFilterComponent);
  }

  _handleFilterTypeChange(activeFilter = FilterType.EVERYTHING) {
    if (this._activeFilter === activeFilter) {
      return;
    }

    this._tripFilterModel.setFilter(UpdateType.MAJOR, activeFilter);
  }

  _getFilters() {

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
      },
      {
        type: FilterType.PAST,
        name: 'past',
      },
    ];
  }

  _handleModelEvent(updateType) {
    switch(updateType) {
      case UpdateType.INIT:
        this._isLoading = false;
        this._isLoadedAdditionalData = true;
        this.init();
        break;
      case UpdateType.ADDITIONAL_DATA:
        this._isLoading = false;
        this._isLoadedAdditionalData = false;
        this.init(this._isLoading, this._isLoadedAdditionalData);
        break;
      default:
        this.init();
        break;
    }
  }
}
