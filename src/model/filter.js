import AbstractObserver from '../utils/abstract-observer.js';
import {FilterType} from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, activeFilter) {
    this._activeFilter = activeFilter;
    this._notify(updateType, activeFilter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
