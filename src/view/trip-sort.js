import AbstractView from './abstract.js';
import {SortType} from '../const.js';

const createTripSortTemplate = (activeSort) => {
  const getItemTemplate = (sortType, isChecked, isDisabled = false) => (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${sortType}" data-active-sort="${sortType}">${sortType}</label>
  </div>`);

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((sortType) => getItemTemplate(sortType, activeSort === sortType, sortType === SortType.EVENT || sortType === SortType.OFFER))
    .join('')}
    </form>`;
};

export default class TripSort extends AbstractView {
  constructor(activeSort) {
    super();
    this._activeSort = activeSort;
    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  getTemplate() {
    return createTripSortTemplate(this._activeSort);
  }

  _sortClickHandler(evt) {
    evt.preventDefault();
    this._callback.sortClick(evt.target.dataset.activeSort);
  }

  setSortClickHandler(callback) {
    this._callback.sortClick = callback;
    this.getElement().addEventListener('click', this._sortClickHandler);
  }
}
