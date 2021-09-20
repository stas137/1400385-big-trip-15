const COUNT_CITIES_ROUTE = 3;
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic er1w590ik29889b';

const SHAKE_ANIMATION_TIMEOUT = 600;

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
  ADDITIONAL_DATA: 'add_data',
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
  typePoint: '',
  cityPoint: '',
  startDateTime: '',
  endDateTime: '',
  duration: '',
  price: '',
  pointOffers: '',
  destination: '',
  isFavorite: false,
};

export {END_POINT, AUTHORIZATION, SHAKE_ANIMATION_TIMEOUT, RenderPosition, Method, SuccessStatusHTTPRange, Mode, SortType, FilterType, UpdateType, UserAction, MenuItem, POINT_BLANK, COUNT_CITIES_ROUTE};

