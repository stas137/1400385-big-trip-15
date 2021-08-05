import dayjs from 'dayjs';

const tripRoute = (points = {}) => {

  const {length = 0} = points;

  if (length > 3) {
    return `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${points[0].cityPoint} &mdash; ... &mdash; ${points[points.length - 1].cityPoint}</h1>
    <p class="trip-info__dates">${dayjs(points[0].startDateTime).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(points[points.length - 1].endDateTime).format('MMM DD')}</p>
    </div>
    </section>`;
  } else if (length === 2) {
    return `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${points[0].cityPoint} &mdash; ${points[1].cityPoint}</h1>
    <p class="trip-info__dates">${dayjs(points[0].startDateTime).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(points[1].endDateTime).format('MMM DD')}</p>
    </div>
    </section>`;
  } else if (length === 1) {
    return `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${points[0].cityPoint}</h1>
    <p class="trip-info__dates">${dayjs(points[0].startDateTime).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(points[0].endDateTime).format('MMM DD')}</p>
    </div>
    </section>`;
  }

  return `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">&mdash; ... &mdash;</h1>
  <p class="trip-info__dates">&nbsp;&mdash;&nbsp;</p>
  </div>
  </section>`;
};

export {tripRoute};
