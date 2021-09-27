import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';

const createTripMenuTemplate = (isStatistics) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
<a class="trip-tabs__btn  ${!isStatistics ? 'trip-tabs__btn--active' : ''}" href="#">${MenuItem.TABLE}</a>
<a class="trip-tabs__btn  ${isStatistics ? 'trip-tabs__btn--active' : ''}" href="#">${MenuItem.STATS}</a>
</nav>`);

export default class TripMenu extends AbstractView {
  constructor(isStatistics) {
    super();

    this._isStatistics = isStatistics;

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createTripMenuTemplate(this._isStatistics);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.textContent);
  }
}
