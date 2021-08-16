import AbstractView from './abstract.js';

const createTripPointEmptyTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class TripPointEmpty extends AbstractView {
  getTemplate() {
    return createTripPointEmptyTemplate();
  }
}
