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
    {name: 'Add luggage', type: 'luggage', price: '50', checked: true},
    {name: 'Switch to comfort', type: 'comfort', price: '80', checked: true},
    {name: 'Add meal', type: 'meal', price: '15', checked: false},
    {name: 'Choose seats', type: 'seats', price: '5', checked: false},
    {name: 'Travel by train', type: 'train', price: '40', checked: true},
  ],
  'taxi': [
    {name: 'Order Uber', price: '20', checked: true},
  ],
  'drive': [
    {name: 'Rent a car', price: '200', checked: true},
  ],
  'sightseeing': [
    {name: 'Book tickets', price: '40', checked: true},
    {name: 'Lunch in city', price: '30', checked: false},
  ],
  'check-in': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'restaurant': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'bus': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'train': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'ship': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
  'transport': [
    {name: 'Add breakfast', price: '50', checked: true},
  ],
};

export {TRIP_POINTS_COUNT, POINT_TYPES, MAX_MINUTES_GAP, POINT_CITIES, POINT_OFFERS, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS};
