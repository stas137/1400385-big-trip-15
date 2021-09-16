import {END_POINT, AUTHORIZATION, MenuItem, UpdateType, FilterType} from './const.js';
import {render} from './utils/render.js';
import TripPointMenuView from './view/trip-menu.js';
import TripPointNewView from './view/trip-point-new.js';

import TripFilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import TripFilterModel from './model/filter.js';
import TripPointsModel from './model/points.js';
import TripDestinationsModel from './model/destinations.js';
import TripOffersModel from './model/offers.js';

import Api from './api.js';

const api = new Api(END_POINT, AUTHORIZATION);
let isLoading = true;

const tripPointsModel = new TripPointsModel();
const tripFilterModel = new TripFilterModel();

const bodyElement = document.querySelector('body');
const tripControlsEvents = bodyElement.querySelector('.trip-events');
const tripMain = bodyElement.querySelector('.trip-main');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilter = bodyElement.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter(bodyElement, tripControlsEvents, tripPointsModel, tripFilterModel, api);
const tripFilter = new TripFilterPresenter(tripControlsFilter, tripFilterModel, tripPointsModel);

const tripPointMenuComponent = new TripPointMenuView();
const tripPointNewComponent = new TripPointNewView();

const handleTripPointClose = () => {
  tripPointNewComponent.turnOn();
};

const handleTripPointMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      tripFilterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPointNewComponent.turnOff();
      tripPresenter.createTripPoint(handleTripPointClose);
      break;
    case MenuItem.TABLE:
      break;
    case MenuItem.STATS:
      break;
  }
};

tripPointNewComponent.setClickTripPointNewHandler(handleTripPointMenuClick);
tripPointMenuComponent.setMenuClickHandler(handleTripPointMenuClick);

render(tripMain, tripPointNewComponent);
render(tripControlsNavigation, tripPointMenuComponent);

const checkLoading = () => isLoading ? tripPointNewComponent.turnOff() : tripPointNewComponent.turnOn();

tripFilter.init(isLoading);
tripPresenter.init(isLoading);

checkLoading();

api.getDestinations()
  .then((destinations) => {
    TripDestinationsModel.setDestinations(destinations);
  })
  .catch(() => {
    TripDestinationsModel.setDestinations([]);
  });

api.getOffers()
  .then((offers) => {
    TripOffersModel.setOffers(offers);
  })
  .catch(() => {
    TripOffersModel.setOffers([]);
  });

api.getPoints()
  .then((points) => {
    tripPointsModel.setPoints(UpdateType.INIT, points);
    isLoading = false;
    checkLoading();
  })
  .catch(() => {
    tripPointsModel.setPoints(UpdateType.INIT, []);
    isLoading = false;
    checkLoading();
  });
