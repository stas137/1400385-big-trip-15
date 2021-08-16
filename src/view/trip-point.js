import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createOffersTemplate = ({pointOffers}) => (
  pointOffers.offers
    .map((offer) => offer.checked ? `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>` : '')
    .join(''));

const createTripPointTemplate = (point) => (
  `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(point.startDateTime).format('YYYY-MM-DD')}">${dayjs(point.startDateTime).format('MMM DD')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${point.typePoint.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.typePoint} ${point.cityPoint}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(point.startDateTime).format('YYYY-MM-DD[T]HH:mm')}">${dayjs(point.startDateTime).format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(point.endDateTime).format('YYYY-MM-DD[T]HH:mm')}">${dayjs(point.endDateTime).format('HH:mm')}</time>
      </p>
      <p class="event__duration">${point.duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffersTemplate(point)}
    </ul>
    <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active':''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>
  `);

export default class TripPoint extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createTripPointTemplate(this._point);
  }
}
