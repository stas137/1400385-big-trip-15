import {getRandomInteger} from './utils.js';

const TRIP_POINTS_COUNT = 15;
const MAX_MINUTES_GAP = 55;
const TEXT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const URL_PHOTO = 'http://picsum.photos/248/152?r=';
const MAX_COUNT_SENTENCES = 5;
const MAX_COUNT_PHOTOS = 7;

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

const POINT_OFFERS = {
  'flight': [
    {name: 'Add luggage', type: 'luggage', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
    {name: 'Switch to comfort', type: 'comfort', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
    {name: 'Add meal', type: 'meal', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
    {name: 'Choose seats', type: 'seats', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
    {name: 'Travel by train', type: 'train', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'taxi': [
    {name: 'Order Uber', type: 'uber', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'drive': [
    {name: 'Rent a car', type: 'car', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'sightseeing': [
    {name: 'Book tickets', type: 'tickets', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
    {name: 'Lunch in city', type: 'lunch', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'check-in': [
    {name: 'Add breakfast', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'restaurant': [
    {name: 'Add breakfast', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'bus': [
    {name: 'Add breakfast', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'train': [
    {name: 'Add breakfast', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'ship': [
    {name: 'Add breakfast', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
  'transport': [
    {name: 'Add breakfast', price: String(getRandomInteger(1, 50)), checked: Boolean(getRandomInteger(0, 1))},
  ],
};

export {TRIP_POINTS_COUNT, POINT_TYPES, MAX_MINUTES_GAP, POINT_CITIES, POINT_OFFERS, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS};
