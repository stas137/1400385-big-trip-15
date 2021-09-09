import AbstractObserver from '../utils/abstract-observer.js';
import {FilterType} from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = null;
  }

  setFilter(updateEvent, activeFilter = FilterType.EVERYTHING) {
    this._activeFilter = activeFilter;
    this._notify(updateEvent, this.getFilter());
  }

  getFilter() {
    return this._activeFilter;
  }
}
