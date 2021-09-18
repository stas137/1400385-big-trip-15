import {END_POINT, AUTHORIZATION, MenuItem, UpdateType, FilterType} from './const.js';
import {render} from './utils/render.js';
import TripPointMenuView from './view/trip-menu.js';
import TripPointNewBtnView from './view/trip-point-new-btn.js';

import TripFilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import TripFilterModel from './model/filter.js';
import TripPointsModel from './model/points.js';
import TripDestinationsModel from './model/destinations.js';
import TripOffersModel from './model/offers.js';

import Api from './api.js';

const api = new Api(END_POINT, AUTHORIZATION);
let isLoading = true;
let isLoadedAdditionalData = false;

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
const tripPointNewBtnComponent = new TripPointNewBtnView();

const handleTripPointClose = () => {
  tripPointNewBtnComponent.turnOn();
};

const handleTripPointMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      tripFilterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPointNewBtnComponent.turnOff();
      tripPresenter.createTripPoint(handleTripPointClose);
      break;
    case MenuItem.TABLE:
      break;
    case MenuItem.STATS:
      break;
  }
};

tripPointNewBtnComponent.setClickTripPointNewHandler(handleTripPointMenuClick);
tripPointMenuComponent.setMenuClickHandler(handleTripPointMenuClick);

render(tripMain, tripPointNewBtnComponent);
render(tripControlsNavigation, tripPointMenuComponent);

const checkLoading = () => isLoading ? tripPointNewBtnComponent.turnOff() : tripPointNewBtnComponent.turnOn();
const checkLoadedAdditionalData = () => isLoadedAdditionalData ? tripPointNewBtnComponent.turnOn() : tripPointNewBtnComponent.turnOff();

tripFilter.init(isLoading);
tripPresenter.init(isLoading);

checkLoading();

api.getDestinations()
  .then((destinations) => {
    TripDestinationsModel.setDestinations(destinations);
    console.log(destinations);
    api.getOffers()
      .then((offers) => {
        TripOffersModel.setOffers(offers);
        console.log(offers);
        api.getPoints()
          .then((points) => {
            tripPointsModel.setPoints(UpdateType.INIT, points);
            isLoading = false;
            isLoadedAdditionalData = true;
            checkLoading();
            console.log(points);
          })
          .catch(() => {
            tripPointsModel.setPoints(UpdateType.ADDITIONAL_DATA, []);
            isLoading = false;
            isLoadedAdditionalData = true;
            checkLoadedAdditionalData();
          });
      })
      .catch(() => {
        tripPointsModel.setPoints(UpdateType.ADDITIONAL_DATA, []);
        isLoadedAdditionalData = false;
        checkLoadedAdditionalData();
      });
  })
  .catch(() => {
    tripPointsModel.setPoints(UpdateType.ADDITIONAL_DATA, []);
    isLoadedAdditionalData = false;
    checkLoadedAdditionalData();
  });


