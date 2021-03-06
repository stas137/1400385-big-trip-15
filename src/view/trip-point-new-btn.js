import AbstractView from './abstract.js';

const createTripPointNewTemplate = (isLoading) => `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isLoading ? 'disabled' : ''}>New event</button>`;

export default class TripPointNewBtn extends AbstractView {
  constructor(isLoading = false) {
    super();

    this._isLoading = isLoading;
    this._clickTripPointNewHandler = this._clickTripPointNewHandler.bind(this);
  }

  getTemplate() {
    return createTripPointNewTemplate(this._isLoading);
  }

  turnOn() {
    this.getElement().parentElement.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  turnOff() {
    this.getElement().parentElement.querySelector('.trip-main__event-add-btn').disabled = true;
  }

  setClickTripPointNewHandler(callback) {
    this._callback.tripPointNewClick = callback;
    this.getElement().parentElement.querySelector('.trip-main__event-add-btn').addEventListener('click', this._clickTripPointNewHandler);
  }

  _clickTripPointNewHandler(evt) {
    evt.preventDefault();
    this._callback.tripPointNewClick(evt.target.textContent);
  }
}
