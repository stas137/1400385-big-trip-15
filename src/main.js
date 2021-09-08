import {TRIP_POINTS_COUNT} from './const.js';
import {render} from './utils/render.js';
import {generatePoint} from './mock/point-mock.js';
import TripMenuView from './view/trip-menu.js';
import TripFiltersPresenter from './presenter/filters.js';
import TripPresenter from './presenter/trip.js';
import TripPointsModel from './model/points.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);

const tripPointsModel = new TripPointsModel();
tripPointsModel.setPoints(tripPoints);

const bodyElement = document.querySelector('body');

const tripControlsEvents = bodyElement.querySelector('.trip-events');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');

const tripFilters = new TripFiltersPresenter(tripControlsFilters, tripPointsModel);
const tripPresenter = new TripPresenter(bodyElement, tripControlsEvents, tripPointsModel);

render(tripControlsNavigation, new TripMenuView());

tripFilters.init();
tripPresenter.init();
