import {END_POINT, AUTHORIZATION, MenuItem, UpdateType, FilterType} from './const.js';
import {isOnline} from './utils/common.js';
import {toast} from './utils/toast.js';
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

import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_VER = 'v15';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const STORE_NAME_DESTINATIONS = `${STORE_PREFIX}-destinations-${STORE_VER}`;
const STORE_NAME_OFFERS = `${STORE_PREFIX}-offers-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage, STORE_NAME_DESTINATIONS, window.localStorage, STORE_NAME_OFFERS, window.localStorage);
const apiWithProvider = new Provider(api, store);

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

const tripPresenter = new TripPresenter(bodyElement, tripControlsEvents, tripControlsMain, tripPointsModel, tripFilterModel, apiWithProvider);
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

      if (!isOnline()) {
        toast('You can\'t create new trip point offline');
        break;
      }

      tripPointNewBtnComponent.turnOff();
      tripPresenter.createTripPoint(handleTripPointClose);
      break;
    case MenuItem.TABLE:
      tripPresenter.destroy();
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

apiWithProvider.getDestinations()
  .then((destinations) => {
    TripDestinationsModel.setDestinations(destinations);
    apiWithProvider.getOffers()
      .then((offers) => {
        TripOffersModel.setOffers(offers);
        apiWithProvider.getPoints()
          .then((points) => {
            isLoading = false;
            isLoadedAdditionalData = true;
            tripPointsModel.setPoints(UpdateType.INIT, points);
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

const onLoadPage = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
};

const onlinePage = () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
};

const offlinePage = () => {
  document.title += ' [offline]';
};

window.addEventListener('load', onLoadPage);
window.addEventListener('online', onlinePage);
window.addEventListener('offline', offlinePage);
