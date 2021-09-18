import TripDestinationsModel from '../model/destinations.js';
import TripOffersModel from '../model/offers.js';

const ESC_CODE = 'Escape';

const isEscEvent = (code) => code === ESC_CODE;

const getRandomInteger = (a = 0, b = 1) => {
  const lower  = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateId = () => getRandomInteger(0, 250);

const compareDate = (a, b) => (new Date(a.startDateTime) > new Date(b.startDateTime)) ? 1 : -1;
const compareTime = (a, b) => ((new Date(a.endDateTime) - new Date(a.startDateTime)) > (new Date(b.endDateTime) - new Date(b.startDateTime))) ? 1 : -1;
const comparePrice = (a, b) => (Number(a.price) > Number(b.price)) ? 1 : -1;
const compareFuture = (a, b = new Date()) => (a.startDateTime > b) ? 1 : -1;
const comparePast = (a, b = new Date()) => (a.startDateTime < b) ? 1 : -1;

const generateTypePoint = () => {
  const offers = TripOffersModel.getOffers();
  const randomIndex = getRandomInteger(0, offers.length - 1);
  return offers[randomIndex].type;
};

const generateCityPoint = () => {
  const destinations = TripDestinationsModel.getDestinations();
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex].name;
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

const generateOffers = (typePoint) => {
  const offersForType = TripOffersModel.getOffers().find((item) => item.type === typePoint);
  return offersForType.offers;
};

const generateDestination = (cityPoint) => {
  const destination = TripDestinationsModel.getDestinations().find((item) => item.name === cityPoint);
  return destination;
};

export {isEscEvent, getRandomInteger, generateId, generateTypePoint, generateCityPoint, getDuration, getDurationTripPoint, compareDate, compareTime, comparePrice, compareFuture, comparePast, generateOffers, generateDestination};
