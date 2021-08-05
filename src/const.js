const TRIP_POINTS_COUNT = 1;
const MAX_MINUTES_GAP = 55;
const TEXT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const URL_PHOTO = 'http://picsum.photos/248/152?r=';
const MAX_COUNT_SENTENCES = 5;
const MAX_COUNT_PHOTOS = 7;

const POINT_TYPE = [
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

const CITY_POINT = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

const OFFERS_POINT = {
  'Flight': [
    {name: 'Add luggage', 'name-input': 'luggage', price: '50', checked: true},
    {name: 'Switch to comfort', 'name-input': 'comfort',price: '80', checked: true},
    {name: 'Add meal', 'name-input': 'meal', price: '15', checked: false},
    {name: 'Choose seats', 'name-input': 'seats', price: '5', checked: false},
    {name: 'Travel by train', 'name-input': 'train', price: '40', checked: true},
  ],
  'Taxi': [
    {name: 'Order Uber', price: '20', checked: true},
  ],
  'Drive': [
    {name: 'Rent a car', price: '200', checked: true},
  ],
  'Sightseeing': [
    {name: 'Book tickets', price: '40', checked: true},
    {name: 'Lunch in city', price: '30', checked: false},
  ],
  'Check-in': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'Restaurant': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'Bus': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'Train': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'Ship': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'Transport': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
};

const PRICE_POINT = [
  '200',
  '100',
  '50',
  '15',
  '5',
];

export {TRIP_POINTS_COUNT, POINT_TYPE, MAX_MINUTES_GAP, CITY_POINT, OFFERS_POINT, PRICE_POINT, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS};
