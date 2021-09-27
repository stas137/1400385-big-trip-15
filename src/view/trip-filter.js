import AbstractView from './abstract.js';

const createTripFilterTemplate = (filters, activeFilter, isLoading, isLoadedAdditionalData, isStatistics) => {
  const getItemTemplate = (filter, isChecked) => (
    `<div class="trip-filters__filter">
  <input 
    id="filter-${filter.name}" 
    class="trip-filters__filter-input 
    visually-hidden" 
    type="radio" 
    name="trip-filter" 
    value="${filter.name}" ${isChecked ? 'checked' : ''} ${(isLoading && !isChecked) || (!isLoadedAdditionalData && !isChecked) ? 'disabled' : ''} ${isStatistics ? 'disabled' : ''}
  />
  <label 
    class="trip-filters__filter-label" 
    for="filter-${filter.name}" 
    data-active-filter="${filter.name}">${filter.name}
  </label>
</div>`);

  return `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => getItemTemplate(filter, activeFilter === filter.type)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class TripFilter extends AbstractView {
  constructor(filters, activeFilter, isLoading, isLoadedAdditionalData, isStatistics){
    super();

    this._filters = filters;
    this._activeFilter = activeFilter;

    this._isLoading = isLoading;
    this._isLoadedAdditionalData = isLoadedAdditionalData;
    this._isStatistics = isStatistics;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripFilterTemplate(this._filters, this._activeFilter, this._isLoading, this._isLoadedAdditionalData, this._isStatistics);
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.parentElement.querySelector('.trip-filters__filter-input').disabled) {
      return;
    }

    if (evt.target.dataset.activeFilter) {
      this._callback.filterClick(evt.target.dataset.activeFilter);
    }
  }
}
