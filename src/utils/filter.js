import {FilterType} from '../const.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => (point.startDateTime >= new Date()) || (point.startDateTime < new Date() && point.endDateTime > new Date())),
  [FilterType.PAST]: (points) => points.filter((point) => (point.endDateTime < new Date()) || (point.startDateTime < new Date() && point.endDateTime > new Date())),
};
