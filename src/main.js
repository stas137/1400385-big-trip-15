import {tripMenu} from './view/trip-menu.js';
import {tripFilters} from './view/trip-filters.js';
import {tripRoute} from './view/trip-route.js';
import {tripCost} from './view/trip-cost.js';
import {tripSort} from './view/trip-sort.js';
import {tripPointsContainer} from './view/trip-points-container.js';
import {tripPoint} from './view/trip-point.js';
import {tripPointEdit} from './view/trip-point-edit.js';

const TRIP_POINTS_COUNT = 3;

const bodyElement = document.querySelector('body');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');
const tripControlsMain = bodyElement.querySelector('.trip-main');

const renderComponent = (container, component, place = 'beforeend') => {
  container.insertAdjacentHTML(place, component);
};

renderComponent(tripControlsMain, tripRoute(), 'afterbegin');

const tripControlsInfo = bodyElement.querySelector('.trip-info');
const tripControlsEvents = bodyElement.querySelector('.trip-events');

renderComponent(tripControlsInfo, tripCost());

renderComponent(tripControlsNavigation, tripMenu());
renderComponent(tripControlsFilters, tripFilters());

renderComponent(tripControlsEvents, tripSort());
renderComponent(tripControlsEvents, tripPointsContainer());

const tripControlsEventsContainer = bodyElement.querySelector('.trip-events__list');

renderComponent(tripControlsEventsContainer, tripPointEdit());

const renderTripPoints = () => {
  for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
    renderComponent(tripControlsEventsContainer, tripPoint());
  }
};

renderTripPoints();
