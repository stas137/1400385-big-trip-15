import {FilterType} from '../const.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => (new Date(point.startDateTime) >= new Date()) || (new Date(point.startDateTime) < new Date() && new Date(point.endDateTime) > new Date())),
  [FilterType.PAST]: (points) => points.filter((point) => (new Date(point.endDateTime) < new Date()) || (new Date(point.startDateTime) < new Date() && new Date(point.endDateTime) > new Date())),
};
