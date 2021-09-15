import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';

const createTripMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
<a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
</nav>`);

export default class TripMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.textContent);
  }

  getTemplate() {
    return createTripMenuTemplate();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}
