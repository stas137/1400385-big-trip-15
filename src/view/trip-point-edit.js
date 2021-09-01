import dayjs from 'dayjs';
import {POINT_TYPES, POINT_BLANK} from '../const';
import {generateId, generateOffers, generateDestination} from '../utils/common.js';
import SmartView from './smart.js';

const createOffersTemplate = ({id, pointOffers}) => (pointOffers.offers
  .map((offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${id}" type="checkbox" name="event-offer-${offer.type}" ${offer.checked ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${offer.type}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`)
  .join(''));

const createOffersContainerTemplate = (point) => (point.pointOffers.offers.length ? `<section class="event__section  event__section--offers">
<h3 class="event__section-title  event__section-title--offers">Offers</h3>
<div class="event__available-offers">
  ${createOffersTemplate(point)}
</div>
</section>` : '');

const createPicturesTemplate = (pictures) => {
  const pointPictures = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${pointPictures}
  </div>
</div>`;
};

const createTripPointEditTemplate = (point) => {
  const getItemTemplate = (value, isChecked) => (`<div class="event__type-item">
    <input id="event-type-${value.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value.toLowerCase()}" ${isChecked ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${value.toLowerCase()}" for="event-type-${value.toLowerCase()}-1">${value}</label>
  </div>`);

  return `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${point.typePoint.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${POINT_TYPES.map((value) => getItemTemplate(value, point.typePoint === value)).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${point.typePoint}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.cityPoint}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam">Amsterdam</option>
        <option value="Geneva">Geneva</option>
        <option value="Chamonix">Chamonix</option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(point.startDateTime).format('DD[/]MM[/]YY HH[:]mm')}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(point.endDateTime).format('DD[/]MM[/]YY HH[:]mm')}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    ${createOffersContainerTemplate(point)}

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${point.destination.description}</p>
      ${createPicturesTemplate(point.destination.pictures)}
    </section>
  </section>
</form>
</li>`;
};

export default class TripPointEdit extends SmartView {
  constructor(point = POINT_BLANK) {
    super();

    this._point = TripPointEdit.tripPointToData(point);

    if (point === POINT_BLANK) {
      this._point.id = generateId();
    }

    this._changeTripPointTypeHandler = this._changeTripPointTypeHandler.bind(this);
    this._selectTripPointTypeHandler = this._selectTripPointTypeHandler.bind(this);
    this._changeTripPointCityHandler = this._changeTripPointCityHandler.bind(this);
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setHandlers();
  }

  getTemplate() {
    return createTripPointEditTemplate(this._point);
  }

  static tripPointToData(data) {
    return Object.assign(
      {},
      data,
      {
        isChangeTripPointType: false,
        newTripPointType: '',
      },
    );
  }

  static dataToTripPoint(data) {

    if (data.isChangeTripPointType && data.isChangeTripPointCity) {
      data.typePoint = data.newTripPointType;
      data.cityPoint = data.newTripPointCity;

      data =  Object.assign(
        {}, 
        data,
        {
          pointOffers: generateOffers(data.typePoint.toLowerCase()),
          destination: generateDestination(data.cityPoint),
        }
      );

    } else if (data.isChangeTripPointType) {
      data.typePoint = data.newTripPointType;

      data =  Object.assign(
        {}, 
        data,
        {
          pointOffers: generateOffers(data.typePoint.toLowerCase()),
        }
      );
    } else if (data.isChangeTripPointCity) {
      data.cityPoint = data.newTripPointCity;

      data =  Object.assign(
        {}, 
        data,
        {
          destination: generateDestination(data.cityPoint),
        }
      );
    }

    delete data.isChangeTripPointType;
    delete data.newTripPointType;
    delete data.isChangeTripPointCity;
    delete data.newTripPointCity;

    return data;
  }

  _selectTripPointTypeHandler() {
    if (this._point.isChangeTripPointType) {
      this._point = TripPointEdit.dataToTripPoint(this._point);
      this.updateElement({}, false);
      this._setHandlers();
    }
  }

  _changeTripPointTypeHandler(evt) {
    if (evt.target.classList.contains('event__type-label')) {
      if (evt.target.textContent.toLowerCase() !== this._point.typePoint.toLowerCase()) {
        this.updateData({
          isChangeTripPointType: true,
          newTripPointType: evt.target.textContent,
        }, true);
      } else {
        this.updateData({
          isChangeTripPointType: false,
          newTripPointType: evt.target.textContent,
        }, true);
      }
    }
  }

  _changeTripPointCityHandler(evt) {
    if (evt.target.value !== '') {
      this.updateData({
        isChangeTripPointCity: true,
        newTripPointCity: evt.target.value,
      }, false);
      this._point = TripPointEdit.dataToTripPoint(this._point);
      this.updateElement({}, false);
      this._setHandlers();
    }
    else {
      this.updateData({
        isChangeTripPointCity: false,
        newTripPointCity: '',
      }, true);
    }
  }

  _closeBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeBtnClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._point = TripPointEdit.dataToTripPoint(this._point);
    this._callback.formSubmit(this._point);
  }

  _setHandlers() {
    this.getElement().querySelector('.event__type-btn').addEventListener('click', this._selectTripPointTypeHandler);
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._changeTripPointTypeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeTripPointCityHandler);
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeBtnClickHandler);
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setSelectTripPointTypeHandler(callback) {
    this._callback.selectTripPointClick = callback;
  }

  setChangeTripPointTypeHandler(callback) {
    this._callback.changeTripPointClick = callback;
  }

  setChangeTripPointCityHandler(callback) {
    this._callback.changeTripPointCityClick = callback;
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closeBtnClick = callback;
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
  }
}
