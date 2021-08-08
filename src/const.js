import {getRandomInteger} from './utils.js';

const TRIP_POINTS_COUNT = 15;
const MAX_MINUTES_GAP = 55;
const TEXT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const URL_PHOTO = 'http://picsum.photos/248/152?r=';
const MAX_COUNT_SENTENCES = 5;
const MAX_COUNT_PHOTOS = 7;

const RENDER_POSITION = {
  afterbegin: 'afterbegin',
  beforeend: 'beforeend',
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

const POINT_OFFERS = [
  {
    type: 'flight',
    offers: [
      {
        title: 'Add luggage',
        type: 'luggage',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Switch to comfort',
        type: 'comfort',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Add meal',
        type: 'meal',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Choose seats',
        type: 'seats',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Travel by train',
        type: 'train',
        price: String(getRandomInteger(1, 50)),
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
        price: String(getRandomInteger(1, 50)),
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
        price: String(getRandomInteger(1, 50)),
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
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Lunch in city',
        type: 'lunch',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Add breakfast',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'Add breakfast',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Add breakfast',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Add breakfast',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Add breakfast',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'transport',
    offers: [
      {
        title: 'Add breakfast',
        price: String(getRandomInteger(1, 50)),
        checked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
];

export {TRIP_POINTS_COUNT, RENDER_POSITION, POINT_TYPES, MAX_MINUTES_GAP, POINT_CITIES, POINT_OFFERS, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS};
