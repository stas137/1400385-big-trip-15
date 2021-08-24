import AbstractView from './abstract.js';
import {SortType} from '../const.js';

const createTripSortTemplate = (activeSort) => SortType.getTemplate(activeSort);

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
