import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const createTripFilterTemplate = (activeFilter) => {
  const getItemTemplate = (filterType, isChecked) => (`<div class="trip-filters__filter">
  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${isChecked ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-everything" data-active-filter="${filterType}">${filterType}</label>
</div>`);

  return `<form class="trip-filters" action="#" method="get">
    ${Object.values(FilterType).map((filterType) => getItemTemplate(filterType, activeFilter === filterType)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class TripFilter extends AbstractView {
  constructor(activeFilter) {
    super();
    this._activeFilter = activeFilter;
    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate() {
    return createTripFilterTemplate(this._activeFilter);
  }


  _filterClickHandler(evt) {
    evt.preventDefault();
    this._callback.filterClick(evt.target.dataset.activeFilter);
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._filterClickHandler);
  }
}
