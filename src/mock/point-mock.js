import dayjs from 'dayjs';
import {getRandomInteger, generateId, generateOffers, generateDestination, generateTypePoint, generateCityPoint, getDuration, getDurationTripPoint} from '../utils/common.js';
import {MAX_DAYS_GAP, MAX_MINUTES_GAP} from '../const.js';

const generateDate = () => {

  let firstDateDay = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  let secondDateDay = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);

  const firstDateMinute = getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP);
  const secondDateMinute = getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP);

  if (firstDateDay > secondDateDay) {
    [firstDateDay, secondDateDay] = [secondDateDay, firstDateDay];
  }

  return {
    startDateTime: dayjs().add(firstDateDay, 'day').add(firstDateMinute, 'minute').toDate(),
    endDateTime: dayjs().add(secondDateDay, 'day').add(secondDateMinute, 'minute').toDate(),
  };
};

export const generatePoint = () => {

  const typePoint = generateTypePoint();
  const cityPoint = generateCityPoint();

  const {
    startDateTime,
    endDateTime,
  } = generateDate();

  const {
    durationDays,
    durationHours,
    durationMinutes,
  } = getDuration(startDateTime, endDateTime);

  return {
    id: String(generateId()),
    typePoint,
    cityPoint,
    startDateTime,
    endDateTime,
    duration: getDurationTripPoint(durationDays, durationHours, durationMinutes),
    price: String(getRandomInteger(1, 250)),
    pointOffers: generateOffers(typePoint.toLowerCase()),
    destination: generateDestination(cityPoint),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
