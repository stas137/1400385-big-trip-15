import {remove, render} from '../utils/render.js';
import {FilterType} from '../const.js';
import TripFilterView from '../view/trip-filter.js';

export default class Filter {
  constructor(tripPresenter, tripFilterContainer, tripPointsModel) {
    this._tripPointsModel = tripPointsModel;
    this._tripPresenter = tripPresenter;

    this._tripFilterContainer = tripFilterContainer;

    this._handleFilterChange = this._handleFilterChange.bind(this);
  }

  init(activeFilter = FilterType.EVERYTHING) {
    this._activeFilter = activeFilter;

    this._tripFilterComponent = new TripFilterView(this._activeFilter);
    this._tripFilterComponent.setFilterClickHandler(this._handleFilterChange);

    render(this._tripFilterContainer, this._tripFilterComponent);
  }

  _handleFilterChange(activeFilter) {
    if (this._activeFilter !== activeFilter) {
      this._activeFilter = activeFilter;

      remove(this._tripFilterComponent);
      this.init(activeFilter);

      this._tripPresenter._clearTripPoints();
      this._tripPresenter._renderTripPointsList(this._activeFilter);
    }
  }
}
