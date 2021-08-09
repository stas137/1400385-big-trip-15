import {createElement} from '../utils.js';

const createTripCostTemplate = (points = {}) => {
  const {length = 0} = points;

  if (!length) {
    return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>`;
  }

  const costTrip = points.reduce((sum, item) => sum + Number(item.price), 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${costTrip}</span>
    </p>`;
};

export default class TripCost {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element =  createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
