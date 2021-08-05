import dayjs from 'dayjs';

const tripRoute = (points = {}) => {

  const {length = 0} = points;

  if (!length) {
    return `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">&mdash; ... &mdash;</h1>
    <p class="trip-info__dates">&nbsp;&mdash;&nbsp;</p>
    </div>
    </section>`;
  }

  const route = {
    cityStart: points[0].cityPoint,
    cityFinish: length ? points[length - 1].cityPoint : points[0].cityPoint,
    dateStart: points[0].startDateTime,
    dateFinish:  length ? points[length - 1].endDateTime : points[0].endDateTime,
  };

  return `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">${route.cityStart} &mdash; ... &mdash; ${route.cityFinish}</h1>
  <p class="trip-info__dates">${dayjs(route.dateStart).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(route.dateFinish).format('MMM DD')}</p>
  </div>
  </section>`;
};

export {tripRoute};
