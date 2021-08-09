import {TRIP_POINTS_COUNT, RENDER_POSITION} from './const.js';
import {compareDate} from './utils.js';
import TripMenuView from './view/trip-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripRouteView from './view/trip-route.js';
import TripCostView from './view/trip-cost.js';
import TripSortView from './view/trip-sort.js';
import TripPointsContainerView from './view/trip-points-container.js';
import TripPointView from './view/trip-point.js';
import {tripPointAddEdit} from './view/trip-point-add-edit.js';
import {generatePoint} from './mock/point-mock.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);
const tripPointsSort = tripPoints.sort(compareDate);

const bodyElement = document.querySelector('body');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');
const tripControlsMain = bodyElement.querySelector('.trip-main');

const renderComponent = (container, component, place = RENDER_POSITION.beforeend) => {
  container.insertAdjacentHTML(place, component);
};

renderComponent(tripControlsMain, new TripRouteView(tripPoints).getElement(), RENDER_POSITION.afterbegin);

const tripControlsInfo = bodyElement.querySelector('.trip-info');
const tripControlsEvents = bodyElement.querySelector('.trip-events');

renderComponent(tripControlsInfo, new TripCostView(tripPoints).getElement());

renderComponent(tripControlsNavigation, new TripMenuView().getElement());
renderComponent(tripControlsFilters, new TripFiltersView().getElement());

renderComponent(tripControlsEvents, new TripSortView().getElement());
renderComponent(tripControlsEvents, new TripPointsContainerView().getElement());

const tripControlsEventsContainer = bodyElement.querySelector('.trip-events__list');

renderComponent(tripControlsEventsContainer, tripPointAddEdit(tripPointsSort[0]));

const renderTripPoints = () => {
  for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
    renderComponent(tripControlsEventsContainer, new TripPointView(tripPointsSort[i]).getTemplate());
  }
};

renderTripPoints();
