import dayjs from 'dayjs';
import {createElement} from '../utils.js';

const createTripRouteTemplate = (points = []) => {

  if (!points.length) {
    return `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">&mdash; ... &mdash;</h1>
    <p class="trip-info__dates">&nbsp;&mdash;&nbsp;</p>
    </div>
    </section>`;
  }

  const route = {
    cityStart: points[0].cityPoint,
    cityFinish: points[points.length - 1].cityPoint,
    dateStart: points[0].startDateTime,
    dateFinish: points[points.length - 1].endDateTime,
  };

  return `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">${route.cityStart} &mdash; ... &mdash; ${route.cityFinish}</h1>
  <p class="trip-info__dates">${dayjs(route.dateStart).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(route.dateFinish).format('MMM DD')}</p>
  </div>
  </section>`;
};

export default class TripRoute {
  constructor(points = {}) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createTripRouteTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
