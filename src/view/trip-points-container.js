const createTripPointsContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripPointsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripPointsContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = this.getTemplate();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
