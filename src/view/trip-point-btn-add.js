import AbstractView from './abstract.js';

const createTripPointBtnAddTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class TripPointBtnAdd extends AbstractView {
  constructor() {
    super();

    this._clickTripPointBtnAddHandler = this._clickTripPointBtnAddHandler.bind(this);
  }

  getTemplate() {
    return createTripPointBtnAddTemplate();
  }

  _clickTripPointBtnAddHandler(evt) {
    evt.preventDefault();
    this._callback.tripPointBtnAddClick(evt.target.textContent.toLowerCase());
  }

  setClickTripPointBtnAddHandler(callback) {
    this._callback.tripPointBtnAddClick = callback;
    this.getElement().parentElement.querySelector('.trip-main__event-add-btn').addEventListener('click', this._clickTripPointBtnAddHandler);
  }
}
