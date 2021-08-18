import AbstractView from './abstract.js';

const createTripPointsContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripPointsContainer extends AbstractView {
  getTemplate() {
    return createTripPointsContainerTemplate();
  }
}
