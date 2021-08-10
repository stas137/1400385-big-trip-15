/* import {getRandomInteger} from './utils.js'; */

const TRIP_POINTS_COUNT = 15;
const MAX_DAYS_GAP = 5;
const MAX_MINUTES_GAP = 15;
const TEXT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const URL_PHOTO = 'http://picsum.photos/248/152?r=';
const MAX_COUNT_SENTENCES = 5;
const MAX_COUNT_PHOTOS = 7;
const MAX_PRICE_OFFER = 50;

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const POINT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const POINT_CITIES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

const OFFER_TITLES_TYPES = [
  {
    title: 'Add luggage',
    type: 'luggage',
  },
  {
    title: 'Switch to comfort',
    type: 'comfort',
  },
  {
    title: 'Choose seats',
    type: 'seats',
  },
  {
    title: 'Travel by train',
    type: 'train',
  },
  {
    title: 'Order Uber',
    type: 'uber',
  },
  {
    title: 'Rent a car',
    type: 'car',
  },
  {
    title: 'Book tickets',
    type: 'tickets',
  },
  {
    title: 'Lunch in city',
    type: 'lunch',
  },
  {
    title: 'Add breakfast',
    type: 'breakfast',
  },
];

/* const POINT_OFFERS = [
  {
    type: 'flight',
    offers: [
      {
        title: 'Add luggage',
        type: 'luggage',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Switch to comfort',
        type: 'comfort',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Add meal',
        type: 'meal',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Choose seats',
        type: 'seats',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Travel by train',
        type: 'train',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'taxi',
    offers: [
      {
        title: 'Order Uber',
        type: 'uber',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Rent a car',
        type: 'car',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        title: 'Book tickets',
        type: 'tickets',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Lunch in city',
        type: 'lunch',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Add breakfast',
        type: 'breakfast',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'Add breakfast',
        type: 'breakfast',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Add breakfast',
        type: 'breakfast',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Add breakfast',
        type: 'breakfast',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Add breakfast',
        type: 'breakfast',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'transport',
    offers: [
      {
        title: 'Add breakfast',
        type: 'breakfast',
        price: String(getRandomInteger(1, MAX_PRICE_OFFER)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
]; */

export {TRIP_POINTS_COUNT, RenderPosition, POINT_TYPES, MAX_DAYS_GAP, MAX_MINUTES_GAP, POINT_CITIES, OFFER_TITLES_TYPES, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS, MAX_PRICE_OFFER};
