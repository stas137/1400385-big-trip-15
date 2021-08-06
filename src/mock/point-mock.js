import dayjs from 'dayjs';
import {getRandomInteger} from '../utils.js';
import {POINT_TYPES, MAX_MINUTES_GAP, POINT_CITIES, POINT_OFFERS, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS} from '../const.js';

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};

const generateDate = () => {

  let firstDate = getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP);
  let secondDate = getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP);

  if (firstDate > secondDate) {
    [firstDate, secondDate] = [secondDate, firstDate];
  }

  return [dayjs().add(firstDate, 'minute').toDate(), dayjs().add(secondDate, 'minute').toDate()];
};

const generateCityPoint = () => {
  const randomIndex = getRandomInteger(0, POINT_CITIES.length - 1);
  return POINT_CITIES[randomIndex];
};

const generateOffers = (typePoint) => {
  const pointOffer = POINT_OFFERS.find((item) => item.type === typePoint);
  return pointOffer ? pointOffer.offers : '';
};

const generateDescription = (countSentences = MAX_COUNT_SENTENCES) => {
  const sentences = TEXT_DESCRIPTION.split('. ');

  const randomCount = getRandomInteger(1, countSentences);
  const sentencesSet = new Set();

  while (sentencesSet.size <= randomCount){
    const randomIndex = getRandomInteger(0, sentences.length - 1);
    if (!sentencesSet.has(sentences[randomIndex])) {
      sentencesSet.add(sentences[randomIndex]);
    }
  }

  let description = '';
  for (const value of sentencesSet) {
    description += `${value}. `;
  }

  return description;
};

const generatePictures = () => {

  const randomCount = getRandomInteger(0, MAX_COUNT_PHOTOS - 1);
  const picturesSet = new Set();
  const pictures = [];

  while (picturesSet.size <= randomCount) {
    const randomIndex = getRandomInteger(0, MAX_COUNT_PHOTOS - 1);
    const pictureObj = {
      src: `${URL_PHOTO}${randomIndex}`,
      description: generateDescription(1),
    };
    if (!picturesSet.has(pictureObj)) {
      picturesSet.add(pictureObj);
    }
  }

  for (const value of picturesSet) {
    pictures.push(value);
  }

  return pictures;
};

const generateDestination = (name) => {
  const description = generateDescription();
  const pictures = generatePictures();
  
  return {
    description,
    name,
    pictures,
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

  const typePoint = generatePointType();
  const [startDateTime, endDateTime] = generateDate();

  const timestamp = new Date(0);
  const duration = new Date(endDateTime - startDateTime);
  const durationDays = duration.getDate() - timestamp.getDate();
  const durationHours = duration.getHours() - timestamp.getHours();
  const durationMinutes = duration.getMinutes();

  return {
    typePoint,
    cityPoint: generateCityPoint(),
    startDateTime,
    endDateTime,
    duration: getDurationTripPoint(durationDays, durationHours, durationMinutes),
    price: String(getRandomInteger(1, 250)),
    offers: generateOffers(typePoint.toLowerCase()),
    destination: generateDestination(cityPoint),
    favorite: Boolean(getRandomInteger(0, 1)),
  };
};
