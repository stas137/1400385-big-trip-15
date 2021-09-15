import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const noPointTextType = {
  [FilterType.EVERYTHING]: 'Click "New Event" to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createTripPointEmptyTemplate = (filterType) => {
  const noPointTextValue = noPointTextType[filterType];

  return (
    `<p class="trip-events__msg">
    ${noPointTextValue}
    </p>`);
};

export default class TripPointEmpty extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createTripPointEmptyTemplate(this._data);
  }
}
