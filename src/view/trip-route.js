import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createTripRouteTemplate = (points = []) => {

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

export default class TripRoute extends AbstractView {
  constructor(points = {}) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripRouteTemplate(this._points);
  }
}
