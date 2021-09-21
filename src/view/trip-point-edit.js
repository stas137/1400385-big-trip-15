import he from 'he';
import flatpickr from 'flatpickr';
import {POINT_BLANK} from '../const.js';
import {getDuration, getFormatDuration} from '../utils/common.js';
import {replace} from '../utils/render.js';
import SmartView from './smart.js';
import TripDestinationsModel from '../model/destinations.js';
import TripOffersModel from '../model/offers.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createOffersTemplate = (pointOffers) => {

  const strToCamelCase = (str) => {
    const tempStr = str.toLowerCase().split(' ');
    return tempStr.map((item, index) => index === 0 ? item : `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`).join('');
  };

  return pointOffers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${strToCamelCase(offer.title)}" type="checkbox" name="event-offer-${strToCamelCase(offer.title)}" ${offer.checked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${strToCamelCase(offer.title)}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`)
    .join('');
};

const createOffersContainerTemplate = (pointOffers) => (pointOffers.length ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${createOffersTemplate(pointOffers)}
  </div>
  </section>` : '');

const createPicturesTemplate = (pictures) => {
  if (!pictures) {
    return;
  }
  const pointPictures = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${pointPictures}
  </div>
</div>`;
};

const createTripPointEditTemplate = (point) => {

  const {
    cityPoint,
    typePoint,
    price,
    destination,
    pointOffers,
    newPoint,
    isDisabled,
    isSaving,
    isDeleting,
  } = point;

  const getOfferItemTemplate = (offerType, isChecked) => (`<div class="event__type-item">
    <input id="event-type-${offerType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerType.toLowerCase()}" ${isChecked ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${offerType.toLowerCase()}" for="event-type-${offerType.toLowerCase()}-1">${offerType}</label>
  </div>`);

  const getCityItemTemplate = () => `<option value="${cityPoint}">${cityPoint}</option>`;

  return `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${typePoint.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
          <legend class="visually-hidden">Event type</legend>
          ${TripOffersModel.getOffers().map((offer) => getOfferItemTemplate(offer.type, typePoint === offer.type)).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${typePoint}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityPoint}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-1">
        ${TripDestinationsModel.getDestinations().map((item) => getCityItemTemplate(item.name))}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time" ${isDisabled ? 'disabled' : ''}>
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="{dayjs(point.startDateTime).format('DD[/]MM[/]YY HH[:]mm')}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="{dayjs(point.endDateTime).format('DD[/]MM[/]YY HH[:]mm')}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" ${isDisabled ? 'disabled' : ''}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${newPoint ? 'Cancel' : ''}${isDeleting ? 'Deleting...' : ''}${!newPoint && !isDeleting ? 'Delete' : ''}</button>

    ${newPoint ? '' :
    `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
      <span class="visually-hidden">Open event</span>
    </button>`}
  </header>
  <section class="event__details">
    ${createOffersContainerTemplate(pointOffers)}

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${createPicturesTemplate(destination.pictures)}
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
      const cityPoint = TripDestinationsModel.getRandomCityPoint();
      const typePoint = TripOffersModel.getRandomTypePoint();
      const pointOffers = TripOffersModel.getTypeOffers(typePoint);
      const destination = TripDestinationsModel.getCityDestination(cityPoint);
      const startDateTime = '2021-09-17T00:44:07.377Z';
      const endDateTime = '2021-09-18T00:44:07.377Z';
      const duration = getFormatDuration(1, 0, 0);

      this.updateData({
        cityPoint,
        typePoint,
        pointOffers,
        destination,
        startDateTime,
        endDateTime,
        duration,
        newPoint: true,
      });
    }

    this._datepickerStartDateTime = null;
    this._datepickerEndDateTime = null;

    this._changeTripPointTypeHandler = this._changeTripPointTypeHandler.bind(this);
    this._changeTripPointCityHandler = this._changeTripPointCityHandler.bind(this);
    this._inputTripPointPriceHandler = this._inputTripPointPriceHandler.bind(this);
    this._offerTripPointClickHandler =  this._offerTripPointClickHandler.bind(this);

    this._deleteBtnClickHandler = this._deleteBtnClickHandler.bind(this);
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._updateOffers = this._updateOffers.bind(this);

    this._startDateTimeChangeHandler = this._startDateTimeChangeHandler.bind(this);
    this._endDateTimeChangeHandler = this._endDateTimeChangeHandler.bind(this);

    this._setHandlers();
    this._setDatepickerStart();
    this._setDatepickerEnd();
  }

  getTemplate() {
    return createTripPointEditTemplate(this._point);
  }

  restoreHandlers() {
    this._setHandlers();
    this._setDatepickerStart();
    this._setDatepickerEnd();
  }

  resetTripPoint(point) {
    this.updateData(
      TripPointEdit.tripPointToData(point),
    );
  }

  static tripPointToData(data) {
    return Object.assign(
      {},
      data,
      {
        isChangeTripPointType: false,
        isChangeTripPointCity: false,
        newTripPointType: '',
        newTripPointCity: '',
        newPoint: false,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static dataToTripPoint(data, submit = false) {

    if (data.isChangeTripPointType && data.isChangeTripPointCity) {
      data.typePoint = data.newTripPointType;
      data.cityPoint = data.newTripPointCity;

      data =  Object.assign(
        {},
        data,
        {
          pointOffers: TripOffersModel.getTypeOffers(data.typePoint.toLowerCase()),
          destination: TripDestinationsModel.getCityDestination(data.cityPoint),
        },
      );
    } else if (data.isChangeTripPointType) {
      data.typePoint = data.newTripPointType;

      data =  Object.assign(
        {},
        data,
        {
          pointOffers: TripOffersModel.getTypeOffers(data.typePoint.toLowerCase()),
        },
      );
    } else if (data.isChangeTripPointCity) {
      data.cityPoint = data.newTripPointCity;

      data =  Object.assign(
        {},
        data,
        {
          destination: TripDestinationsModel.getCityDestination(data.cityPoint),
        },
      );
    }

    delete data.isChangeTripPointType;
    delete data.newTripPointType;
    delete data.isChangeTripPointCity;
    delete data.newTripPointCity;

    if (submit) {
      delete data.newPoint;
      delete data.isDisabled;
      delete data.isSaving;
      delete data.isDeleting;
    }

    return data;
  }

  _changeTripPointTypeHandler(evt) {
    if (evt.target.classList.contains('event__type-label')) {
      if (evt.target.textContent.toLowerCase() !== this._point.typePoint.toLowerCase()) {
        this.updateData({
          isChangeTripPointType: true,
          newTripPointType: evt.target.textContent,
        }, false);
        this._point = TripPointEdit.dataToTripPoint(this._point);
        this.updateData({}, false);
      } else {
        this.updateData({
          isChangeTripPointType: false,
          newTripPointType: '',
        });
      }
    }
  }

  _changeTripPointCityHandler(evt) {
    if ((evt.target.value !== '') && (evt.target.value.toLowerCase() !== this._point.cityPoint.toLowerCase())) {
      this.updateData({
        isChangeTripPointCity: true,
        newTripPointCity: he.encode(evt.target.value),
      }, false);
      this._point = TripPointEdit.dataToTripPoint(this._point);
      this.updateData({}, false);
    }
    else {
      this.updateData({
        isChangeTripPointCity: false,
        newTripPointCity: '',
      });
    }
  }

  _inputTripPointPriceHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: String(evt.target.value),
    });
  }

  _updateOffers(newChild, oldChild) {
    replace(newChild, oldChild);
  }

  _offerTripPointClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('event__available-offers')) {
      return;
    }

    const spanElement = evt.target.classList.contains('event__offer-label') ? evt.target.parentElement.querySelector('.event__offer-title') : evt.target.parentElement.parentElement.querySelector('.event__offer-title');
    const inputElement = evt.target.classList.contains('event__offer-label') ?  evt.target.parentElement.querySelector('.event__offer-checkbox') : evt.target.parentElement.parentElement.querySelector('.event__offer-checkbox') ;
    const offerIndex = this._point.pointOffers.findIndex((item) => item.title === spanElement.textContent);
    const pointOffers = this._point.pointOffers.map((item) => Object.assign({}, item));

    inputElement.checked = !inputElement.checked;

    pointOffers[offerIndex].checked = inputElement.checked;

    this.updateData({
      pointOffers,
    });
  }

  _closeBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeBtnClick();
  }

  _deleteBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteBtnClick(this._point);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._point = TripPointEdit.dataToTripPoint(this._point, true);
    this._callback.formSubmit(this._point);
  }

  _startDateTimeChangeHandler([userStartDateTime]) {
    if (userStartDateTime) {
      const startDateTime = userStartDateTime;
      const endDateTime = this._point.endDateTime;

      const {
        durationDays,
        durationHours,
        durationMinutes,
      } = getDuration(startDateTime, endDateTime);

      this.updateData({
        startDateTime,
        duration: getFormatDuration(durationDays, durationHours, durationMinutes),
      });
    }
  }

  _endDateTimeChangeHandler([userEndDateTime]) {
    if (userEndDateTime) {
      const startDateTime = this._point.startDateTime;
      const endDateTime = userEndDateTime;

      const {
        durationDays,
        durationHours,
        durationMinutes,
      } = getDuration(startDateTime, endDateTime);

      this.updateData({
        endDateTime,
        duration: getFormatDuration(durationDays, durationHours, durationMinutes),
      });
    }
  }

  _setDatepickerStart() {

    if (this._datepickerStartDateTime) {
      this._datepickerStartDateTime.clear();
      this._datepickerStartDateTime.close();
      this._datepickerStartDateTime.destroy();
      this._datepickerStartDateTime = null;
    }

    this._datepickerStartDateTime = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._point.startDateTime,
        enableTime: true,
        onChange: this._startDateTimeChangeHandler,
      },
    );
  }

  _setDatepickerEnd() {

    if (this._datepickerEndDateTime) {
      this._datepickerEndDateTime.clear();
      this._datepickerEndDateTime.close();
      this._datepickerEndDateTime.destroy();
      this._datepickerEndDateTime = null;
    }

    this._datepickerEndDateTime = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._point.endDateTime,
        enableTime: true,
        onChange: this._endDateTimeChangeHandler,
      },
    );
  }

  _setHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._changeTripPointTypeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeTripPointCityHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._inputTripPointPriceHandler);

    if (!this._point.newPoint) {
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeBtnClickHandler);
    }

    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteBtnClickHandler);

    if (this.getElement().querySelector('.event__available-offers')) {
      this.getElement().querySelector('.event__available-offers').addEventListener('click', this._offerTripPointClickHandler);
    }

    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
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

  setDeleteBtnClickHandler(callback) {
    this._callback.deleteBtnClick = callback;
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
  }
}
