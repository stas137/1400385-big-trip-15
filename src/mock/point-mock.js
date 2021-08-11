import dayjs from 'dayjs';
import {getRandomInteger, generateId} from '../utils.js';
import {POINT_TYPES, MAX_DAYS_GAP, MAX_MINUTES_GAP, POINT_CITIES, OFFER_TITLES_TYPES, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS, MAX_PRICE_OFFER} from '../const.js';

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

const generateRandomOffers = (typePoint) => {
  const offersTitlesTypes = OFFER_TITLES_TYPES.filter((item) => item.point === typePoint);
  const offers = offersTitlesTypes.map((item) => ({
    title: item.title,
    type: item.type,
    price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
    checked: Boolean(getRandomInteger(0, 1)),
  }));


  return offers;
};

const generateOffers = (typePoint) => ({
  type: typePoint,
  offers: generateRandomOffers(typePoint),
});

const generateDescription = (countSentences = MAX_COUNT_SENTENCES) => {
  const sentences = TEXT_DESCRIPTION.split('. ');

  const randomCount = getRandomInteger(1, countSentences);
  const sentencesSet = new Set();

  while (sentencesSet.size < randomCount){
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

const checkPicture = (picture, pictures) => pictures.find((item) => item.src === picture.src);

const generatePictures = () => {

  const randomCount = getRandomInteger(0, MAX_COUNT_PHOTOS - 1);
  const pictures = [];

  while (pictures.length < randomCount) {
    const randomIndex = getRandomInteger(0, MAX_COUNT_PHOTOS - 1);
    const picture = {
      src: `${URL_PHOTO}${randomIndex}`,
      description: generateDescription(1),
    };
    if (!checkPicture(picture, pictures)) {
      pictures.push(picture);
    }
  }

  return pictures;
};

const generateDestination = (city) => {
  const description = generateDescription();
  const pictures = generatePictures();
  return {
    description,
    city,
    pictures,
  };
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
    id: String(generateId(0, 250)),
    typePoint,
    cityPoint,
    startDateTime,
    endDateTime,
    duration: getDurationTripPoint(durationDays, durationHours, durationMinutes),
    price: String(getRandomInteger(1, 250)),
    offers: generateOffers(typePoint.toLowerCase()),
    destination: generateDestination(cityPoint),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
