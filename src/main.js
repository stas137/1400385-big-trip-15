import {TRIP_POINTS_COUNT} from './const.js';
import {render} from './utils/render.js';
import {compareDate} from './utils/common.js';
import {generatePoint} from './mock/point-mock.js';
import TripMenuView from './view/trip-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripPresenter from './presenter/trip.js';
import TripPointsModel from './model/points.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);
const tripPointsSort = tripPoints.sort(compareDate).slice();

const tripPointsModel = new TripPointsModel();
tripPointsModel.setPoints(tripPointsSort);

const bodyElement = document.querySelector('body');

const tripControlsEvents = bodyElement.querySelector('.trip-events');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter(bodyElement, tripControlsEvents, tripPointsModel);

render(tripControlsNavigation, new TripMenuView());
render(tripControlsFilters, new TripFiltersView());

tripPresenter.init(tripPointsSort);
