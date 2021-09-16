import {TRIP_POINTS_COUNT, MenuItem, UpdateType, FilterType} from './const.js';
import {render} from './utils/render.js';
import {generatePoint} from './mock/point-mock.js';
import TripMenuView from './view/trip-menu.js';
import TripPointNewView from './view/trip-point-new.js';

import TripFilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import TripFilterModel from './model/filter.js';
import TripPointsModel from './model/points.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);

const tripPointsModel = new TripPointsModel();
tripPointsModel.setPoints(tripPoints);

const tripFilterModel = new TripFilterModel();

const bodyElement = document.querySelector('body');
const tripControlsEvents = bodyElement.querySelector('.trip-events');
const tripMain = bodyElement.querySelector('.trip-main');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilter = bodyElement.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter(bodyElement, tripControlsEvents, tripPointsModel, tripFilterModel);
const tripFilter = new TripFilterPresenter(tripControlsFilter, tripFilterModel, tripPointsModel);

const tripPointNewView = new TripPointNewView();

const handleTripPointClose = () => {
  tripPointNewView.getElement().parentElement.querySelector('.trip-main__event-add-btn').disabled = false;
};

const handleTripPointBtnAddClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      tripFilterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPointNewView.getElement().parentElement.querySelector('.trip-main__event-add-btn').disabled = true;
      tripPresenter.createTripPoint(handleTripPointClose);
      break;
  }
};

tripPointNewView.setClickTripPointBtnAddHandler(handleTripPointBtnAddClick);

render(tripMain, tripPointNewView);
render(tripControlsNavigation, new TripMenuView());

tripFilter.init();
tripPresenter.init();
