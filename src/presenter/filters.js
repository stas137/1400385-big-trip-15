import { render } from '../utils/render.js';
import TripFiltersView from '../view/trip-filters.js';

export default class Filter {
  constructor(tripFiltersContainer, tripPointsModel) {
    this._tripPointsModel = tripPointsModel;

    this._tripFiltersContainer = tripFiltersContainer;

    this._tripFiltersComponent = null;
  }

  init() {
    this._tripFiltersComponent = new TripFiltersView();

    render(this._tripFiltersContainer, this._tripFiltersComponent);
  }
}
