const TRIP_POINTS_COUNT = 0;
const MAX_DAYS_GAP = 5;
const MAX_MINUTES_GAP = 15;
const TEXT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const URL_PHOTO = 'http://picsum.photos/248/152?r=';
const MAX_COUNT_SENTENCES = 5;
const MAX_COUNT_PHOTOS = 7;
const MAX_PRICE_OFFER = 50;

const POINT_BLANK = {
  id: '',
  typePoint: '',
  cityPoint: '',
  startDateTime: '',
  endDateTime: '',
  duration: '',
  price: '',
  offers: '',
  destination: '',
  isFavorite: '',
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
    point: 'flight',
  },
  {
    title: 'Switch to comfort',
    type: 'comfort',
    point: 'flight',
  },
  {
    title: 'Choose seats',
    type: 'seats',
    point: 'flight',
  },
  {
    title: 'Add meal',
    type: 'meal',
    point: 'flight',
  },
  {
    title: 'Travel by train',
    type: 'train',
    point: 'flight',
  },
  {
    title: 'Order Uber',
    type: 'uber',
    point: 'taxi',
  },
  {
    title: 'Rent a car',
    type: 'car',
    point: 'drive',
  },
  {
    title: 'Book tickets',
    type: 'tickets',
    point: 'sightseeing',
  },
  {
    title: 'Lunch in city',
    type: 'lunch',
    point: 'sightseeing',
  },
  {
    title: 'Add breakfast',
    type: 'breakfast',
    point: 'check-in',
  },
];

export {TRIP_POINTS_COUNT, POINT_BLANK, POINT_TYPES, MAX_DAYS_GAP, MAX_MINUTES_GAP, POINT_CITIES, OFFER_TITLES_TYPES, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS, MAX_PRICE_OFFER};
