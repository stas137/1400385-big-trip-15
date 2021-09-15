import AbstractView from './abstract.js';

const createTripPointNewTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class TripPointNew extends AbstractView {
  constructor() {
    super();

    this._clickTripPointNewHandler = this._clickTripPointNewHandler.bind(this);
  }

  getTemplate() {
    return createTripPointNewTemplate();
  }

  _clickTripPointNewHandler(evt) {
    evt.preventDefault();
    this._callback.tripPointNewClick(evt.target.textContent.toLowerCase());
  }

  setClickTripPointNewHandler(callback) {
    this._callback.tripPointNewClick = callback;
    this.getElement().parentElement.querySelector('.trip-main__event-add-btn').addEventListener('click', this._clickTripPointNewHandler);
  }
}
