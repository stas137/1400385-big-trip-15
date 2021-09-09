import {FilterType} from '../const.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.startDateTime > new Date()),
  [FilterType.PAST]: (points) => points.filter((point) => point.endDateTime < new Date()),
};
