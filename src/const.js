const COUNT_CITIES_ROUTE = 3;
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic er1w590ik29989b';

const SHAKE_ANIMATION_TIMEOUT = 600;

const COUNT_MILISECONDS_SECOND = 1000;
const COUNT_SECONDS_MINUTE = 60;
const COUNT_MINUTES_HOUR = 60;
const COUNT_HOURS_DAY = 24;

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const SuccessStatusHTTPRange = {
  MIN: 200,
  MAX: 299,
};

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
  ADDITIONAL_DATA: 'additional_data',
  STATISTICS: 'statistics',
  TRIP_COST: 'trip_cost',
};

const UserAction = {
  UPDATE_POINT: 'update_point',
  ADD_POINT: 'add_point',
  DELETE_POINT: 'delete_point',
  CHANGE_OFFER: 'change_offer',
};

const MenuItem = {
  ADD_NEW_POINT: 'New event',
  TABLE: 'Table',
  STATS: 'Stats',
};

const POINT_BLANK = {
  typePoint: '',
  cityPoint: '',
  startDateTime: '',
  endDateTime: '',
  duration: '',
  price: '1',
  pointOffers: '',
  destination: '',
  isFavorite: false,
};

export {END_POINT, AUTHORIZATION, SHAKE_ANIMATION_TIMEOUT, COUNT_HOURS_DAY, COUNT_MINUTES_HOUR, COUNT_SECONDS_MINUTE, COUNT_MILISECONDS_SECOND, RenderPosition, Method, SuccessStatusHTTPRange, Mode, SortType, FilterType, UpdateType, UserAction, MenuItem, POINT_BLANK, COUNT_CITIES_ROUTE};

