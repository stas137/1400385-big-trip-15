import AbstractView from './abstract.js';

const createTripCostTemplate = (points = {}) => {

  const costTrip = points.reduce((sum, item) => sum + Number(item.price), 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${costTrip}</span>
    </p>`;
};

export default class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
