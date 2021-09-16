import dayjs from 'dayjs';
import AbstractView from './abstract.js';
import {COUNT_CITIES_ROUTE} from '../const.js';

const createTripRouteTemplate = (points = []) => {

  const route = {
    cityStart: points[0].cityPoint,
    citySecond: '',
    cityFinish: points[points.length - 1].cityPoint,
    dateStart: points[0].startDateTime,
    dateFinish: points[points.length - 1].endDateTime,
  };

  let fillerWithDash = '&nbsp;&mdash;&nbsp;';
  let fillerMain = `${route.cityStart}${fillerWithDash}${route.cityFinish}`;

  if (points.length === COUNT_CITIES_ROUTE) {
    route.citySecond = points[1].cityPoint;
    fillerMain = `${route.cityStart}${fillerWithDash}${route.citySecond}${fillerWithDash}${route.cityFinish}`;
  } else {
    if (points.length > COUNT_CITIES_ROUTE) {
      fillerWithDash = `${fillerWithDash}...${fillerWithDash}`;
      fillerMain = `${route.cityStart}${fillerWithDash}${route.cityFinish}`;
    }
  }

  return `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">${fillerMain}</h1>
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
