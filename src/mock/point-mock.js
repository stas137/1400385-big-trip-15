import dayjs from 'dayjs';
import {getRandomInteger, generateId, generateOffers, generateDestination} from '../utils/common.js';
import {POINT_TYPES, MAX_DAYS_GAP, MAX_MINUTES_GAP, POINT_CITIES} from '../const.js';

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};

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

const generateCityPoint = () => {
  const randomIndex = getRandomInteger(0, POINT_CITIES.length - 1);
  return POINT_CITIES[randomIndex];
};

const getDuration = (startDateTime, endDateTime) => {
  const timestamp = new Date(0);
  const duration = new Date(endDateTime - startDateTime);
  let durationDays = duration.getDate() - timestamp.getDate();
  let durationHours = duration.getHours() - timestamp.getHours();
  let durationMinutes = duration.getMinutes();

  if (durationHours < 0) {
    durationDays -= 1;
    durationHours = 23;
    durationMinutes = new Date(endDateTime).getMinutes();
  }

  return {
    durationDays,
    durationHours,
    durationMinutes,
  };
};

const getDurationTripPoint = (durationDays, durationHours, durationMinutes) => {
  if (durationDays > 0) {
    return `${durationDays}D ${durationHours}H ${durationMinutes}M`;
  } else if (durationHours > 0) {
    return `${durationHours}H ${durationMinutes}M`;
  } else if (durationMinutes > 0) {
    return `${durationMinutes}M`;
  }
  return '00M';
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
