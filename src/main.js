import {END_POINT, AUTHORIZATION, MenuItem, UpdateType, FilterType} from './const.js';
import {render, remove} from './utils/render.js';
import TripPointMenuView from './view/trip-menu.js';
import TripPointNewBtnView from './view/trip-point-new-btn.js';
import TripStatisticsView from './view/statistics.js';

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
let isStatistics = false;

const tripPointsModel = new TripPointsModel();
const tripFilterModel = new TripFilterModel();

const bodyElement = document.querySelector('body');
const tripControlsEvents = bodyElement.querySelector('.trip-events');
const tripControlsMain = bodyElement.querySelector('.trip-main');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilter = bodyElement.querySelector('.trip-controls__filters');
const tripStatisticsContainer = tripControlsEvents.parentElement;

const tripPresenter = new TripPresenter(bodyElement, tripControlsEvents, tripControlsMain, tripPointsModel, tripFilterModel, api);
const tripFilterPresenter = new TripFilterPresenter(tripControlsFilter, tripFilterModel, tripPointsModel);

let tripPointMenuComponent = new TripPointMenuView(isStatistics);
const tripPointNewBtnComponent = new TripPointNewBtnView();

let tripStatisticsComponent = null;

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
      tripFilterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPointNewBtnComponent.turnOn();
      remove(tripStatisticsComponent);
      remove(tripPointMenuComponent);

      isStatistics = false;
      tripPointMenuComponent = new TripPointMenuView(isStatistics);
      render(tripControlsNavigation, tripPointMenuComponent);
      tripPointMenuComponent.setMenuClickHandler(handleTripPointMenuClick);

      tripPresenter.init(isLoading);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      tripFilterModel.setFilter(UpdateType.STATISTICS, FilterType.EVERYTHING);
      tripPointNewBtnComponent.turnOff();

      remove(tripPointMenuComponent);

      isStatistics = true;
      tripPointMenuComponent = new TripPointMenuView(isStatistics);
      render(tripControlsNavigation, tripPointMenuComponent);
      tripPointMenuComponent.setMenuClickHandler(handleTripPointMenuClick);

      tripStatisticsComponent = new TripStatisticsView(tripPointsModel.getPoints());
      render(tripStatisticsContainer, tripStatisticsComponent);
      break;
  }
};

tripPointNewBtnComponent.setClickTripPointNewHandler(handleTripPointMenuClick);
tripPointMenuComponent.setMenuClickHandler(handleTripPointMenuClick);

render(tripControlsMain, tripPointNewBtnComponent);
render(tripControlsNavigation, tripPointMenuComponent);

const checkLoading = () => isLoading ? tripPointNewBtnComponent.turnOff() : tripPointNewBtnComponent.turnOn();
const checkLoadedAdditionalData = () => isLoadedAdditionalData ? tripPointNewBtnComponent.turnOn() : tripPointNewBtnComponent.turnOff();

tripFilterPresenter.init(isLoading);
tripPresenter.init(isLoading);

checkLoading();

api.getDestinations()
  .then((destinations) => {
    TripDestinationsModel.setDestinations(destinations);
    api.getOffers()
      .then((offers) => {
        TripOffersModel.setOffers(offers);
        api.getPoints()
          .then((points) => {
            tripPointsModel.setPoints(UpdateType.INIT, points);
            isLoading = false;
            isLoadedAdditionalData = true;
            checkLoading();
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


