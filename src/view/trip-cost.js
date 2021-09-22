import AbstractView from './abstract.js';

const createTripCostTemplate = (points = {}) => {

  const costTripPoints = points.reduce((sum, point) => sum + point.price, 0);
  const tripPointsOffers = points.map((point) => point.pointOffers);
  const costsTripPointsOffers = tripPointsOffers.map((offer) => offer.reduce((sum, item) => (item && item.checked) ? sum += Number(item.price) : sum += 0, 0));
  const costTripPointsOffers = costsTripPointsOffers.reduce((sum, item) => sum + item, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${costTripPoints + costTripPointsOffers}</span>
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
