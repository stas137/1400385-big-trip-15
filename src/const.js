const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic er1w590ik29889b';

const TRIP_POINTS_COUNT = 15;
const MAX_DAYS_GAP = 5;
const MAX_MINUTES_GAP = 15;
const TEXT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const URL_PHOTO = 'http://picsum.photos/248/152?r=';
const MAX_COUNT_SENTENCES = 5;
const MAX_COUNT_PHOTOS = 7;
const MAX_PRICE_OFFER = 50;
const COUNT_CITIES_ROUTE = 3;

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
};

const UserAction = {
  UPDATE_POINT: 'update_point',
  ADD_POINT: 'add_point',
  DELETE_POINT: 'delete_point',
};

const MenuItem = {
  ADD_NEW_POINT: 'New event',
  TABLE: 'Table',
  STATS: 'Stats',
};

const POINT_BLANK = {
  id: '',
  typePoint: '',
  cityPoint: '',
  startDateTime: '',
  endDateTime: '',
  duration: '',
  price: '',
  pointOffers: '',
  destination: '',
  isFavorite: '',
};

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

export {END_POINT, AUTHORIZATION, Mode, SortType, FilterType, UpdateType, UserAction, MenuItem, TRIP_POINTS_COUNT, POINT_BLANK, MAX_DAYS_GAP, MAX_MINUTES_GAP, OFFER_TITLES_TYPES, TEXT_DESCRIPTION, URL_PHOTO, MAX_COUNT_SENTENCES, MAX_COUNT_PHOTOS, MAX_PRICE_OFFER, COUNT_CITIES_ROUTE};

