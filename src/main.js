import {TRIP_POINTS_COUNT, RenderPosition} from './const.js';
import {compareDate} from './utils.js';
import {tripMenu} from './view/trip-menu.js';
import {tripFilters} from './view/trip-filters.js';
import {tripRoute} from './view/trip-route.js';
import {tripCost} from './view/trip-cost.js';
import {tripSort} from './view/trip-sort.js';
import {tripPointsContainer} from './view/trip-points-container.js';
import {tripPoint} from './view/trip-point.js';
import {tripPointAddEdit} from './view/trip-point-add-edit.js';
import {generatePoint} from './mock/point-mock.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);
const tripPointsSort = tripPoints.sort(compareDate);

const bodyElement = document.querySelector('body');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');
const tripControlsMain = bodyElement.querySelector('.trip-main');

const renderComponent = (container, component, place = RenderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, component);
};

renderComponent(tripControlsMain, tripRoute(tripPoints), RenderPosition.AFTERBEGIN);

const tripControlsInfo = bodyElement.querySelector('.trip-info');
const tripControlsEvents = bodyElement.querySelector('.trip-events');

renderComponent(tripControlsInfo, tripCost(tripPoints));

renderComponent(tripControlsNavigation, tripMenu());
renderComponent(tripControlsFilters, tripFilters());

renderComponent(tripControlsEvents, tripSort());
renderComponent(tripControlsEvents, tripPointsContainer());

const tripControlsEventsContainer = bodyElement.querySelector('.trip-events__list');

renderComponent(tripControlsEventsContainer, tripPointAddEdit(tripPointsSort[0]));

const renderTripPoints = () => {
  for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
    renderComponent(tripControlsEventsContainer, tripPoint(tripPointsSort[i]));
  }
};

renderTripPoints();
