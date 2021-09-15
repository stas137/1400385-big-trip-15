import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createTripRouteTemplate = (points = []) => {

  const route = {
    cityStart: points[0].cityPoint,
    cityFinish: points[points.length - 1].cityPoint,
    dateStart: points[0].startDateTime,
    dateFinish: points[points.length - 1].endDateTime,
  };

  if (points.length > 3 || points.length < 3) {
    let filler = '&mdash;';

    if (points.length > 3) {
      filler = '&mdash; ... &mdash;';
    }

    return `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${route.cityStart} ${filler} ${route.cityFinish}</h1>
    <p class="trip-info__dates">${dayjs(route.dateStart).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(route.dateFinish).format('MMM DD')}</p>
    </div>
    </section>`;
  }

  route.citySecond = points[1].cityPoint;

  return `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">${route.cityStart} &mdash; ${route.citySecond} &mdash; ${route.cityFinish}</h1>
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
