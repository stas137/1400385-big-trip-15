import {remove, render, replace} from '../utils/render.js';
import {FilterType, UpdateType} from '../const.js';
import TripFilterView from '../view/trip-filter.js';

export default class Filter {
  constructor(tripFilterContainer, tripFilterModel, tripPointsModel) {

    this._tripFilterModel = tripFilterModel;
    this._tripPointsModel = tripPointsModel;

    this._tripFilterComponent = null;
    this._tripFilterContainer = tripFilterContainer;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripFilterModel.addObserver(this._handleModelEvent);
    this._tripPointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    this._activeFilter = this._tripFilterModel.getFilter();

    this._prevFilterComponent = this._tripFilterComponent;

    this._tripFilterComponent = new TripFilterView(filters, this._activeFilter);
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

    this._tripFilterModel.setFilter(UpdateType.MINOR, activeFilter);
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

  _handleModelEvent() {
    this.init();
  }
}
