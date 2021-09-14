import {POINT_TYPES, POINT_CITIES, OFFER_TITLES_TYPES, MAX_PRICE_OFFER, MAX_COUNT_SENTENCES, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_PHOTOS} from '../const.js';

const ESC_CODE = 'Escape';

const isEscEvent = (code) => code === ESC_CODE;

const getRandomInteger = (a = 0, b = 1) => {
  const lower  = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateId = () => getRandomInteger(0, 250);

const compareDate = (a, b) => (a.startDateTime > b.startDateTime) ? 1 : -1;
const compareTime = (a, b) => ((a.endDateTime - a.startDateTime) > (b.endDateTime - b.startDateTime)) ? 1 : -1;
const comparePrice = (a, b) => (Number(a.price) > Number(b.price)) ? 1 : -1;
const compareFuture = (a, b = new Date()) => (a.startDateTime > b) ? 1 : -1;
const comparePast = (a, b = new Date()) => (a.startDateTime < b) ? 1 : -1;

const generateTypePointOffers = (typePoint) => {
  const offersTitlesTypes = OFFER_TITLES_TYPES.filter((item) => item.point === typePoint);
  const offers = offersTitlesTypes.map((item) => ({
    title: item.title,
    type: item.type,
    price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
    checked: Boolean(getRandomInteger(0, 1)),
  }));

  return offers;
};

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};

const generateCityPoint = () => {
  const randomIndex = getRandomInteger(0, POINT_CITIES.length - 1);
  return POINT_CITIES[randomIndex];
};


const getDuration = (startDateTime, endDateTime) => {
  startDateTime = new Date(startDateTime);
  endDateTime = new Date(endDateTime);
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

const generateOffers = (typePoint) => (generateTypePointOffers(typePoint));

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

const updateItem = (items, updatedItem) => {
  const index = items.findIndex((item) => item.id === updatedItem.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    updatedItem,
    ...items.slice(index + 1),
  ];

};

export {isEscEvent, getRandomInteger, generateId, generateTypePoint, generateCityPoint, getDuration, getDurationTripPoint, compareDate, compareTime, comparePrice, compareFuture, comparePast, generateOffers, generateDestination, updateItem};
