import AbstractView from './abstract.js';
import {SortType} from '../const.js';

const createTripSortTemplate = (sortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<div class="trip-sort__item  trip-sort__item--day">
  <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${sortType === SortType.DAY ? 'checked = true' : ''}>
  <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortType.DAY}">Day</label>
</div>

<div class="trip-sort__item  trip-sort__item--event">
  <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
  <label class="trip-sort__btn" for="sort-event">Event</label>
</div>

<div class="trip-sort__item  trip-sort__item--time">
  <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${sortType === SortType.TIME ? 'checked = true' : ''}>
  <label class="trip-sort__btn" for="sort-time"  data-sort-type="${SortType.TIME}">Time</label>
</div>

<div class="trip-sort__item  trip-sort__item--price">
  <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${sortType === SortType.PRICE ? 'checked = true' : ''}>
  <label class="trip-sort__btn" for="sort-price"  data-sort-type="${SortType.PRICE}">Price</label>
</div>

<div class="trip-sort__item  trip-sort__item--offer">
  <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
  <label class="trip-sort__btn" for="sort-offer">Offers</label>
</div>
</form>`);

export default class TripSort extends AbstractView {
  constructor(sortType) {
    super();
    this._sortType = sortType;
    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  getTemplate() {
    return createTripSortTemplate(this._sortType);
  }

  _sortClickHandler(evt) {
    evt.preventDefault();
    this._callback.sortClick(evt.target.dataset.sortType);
  }

  setSortClickHandler(callback) {
    this._callback.sortClick = callback;
    this.getElement().addEventListener('click', this._sortClickHandler);
  }
}
