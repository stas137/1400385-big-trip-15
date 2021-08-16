import {TRIP_POINTS_COUNT, RenderPosition} from './const.js';
import {isEscEvent, render, compareDate} from './utils.js';
import TripMenuView from './view/trip-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripRouteView from './view/trip-route.js';
import TripCostView from './view/trip-cost.js';
import TripSortView from './view/trip-sort.js';
import TripPointsContainerView from './view/trip-points-container.js';
import TripPointView from './view/trip-point.js';
import TripPointAddEditView from './view/trip-point-add-edit.js';
import {generatePoint} from './mock/point-mock.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);
const tripPointsSort = tripPoints.sort(compareDate);

const bodyElement = document.querySelector('body');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');
const tripControlsMain = bodyElement.querySelector('.trip-main');

render(tripControlsMain, new TripRouteView(tripPoints).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsInfo = bodyElement.querySelector('.trip-info');
const tripControlsEvents = bodyElement.querySelector('.trip-events');

render(tripControlsInfo, new TripCostView(tripPoints).getElement());
render(tripControlsNavigation, new TripMenuView().getElement());
render(tripControlsFilters, new TripFiltersView().getElement());
render(tripControlsEvents, new TripSortView().getElement());
render(tripControlsEvents, new TripPointsContainerView().getElement());

const tripControlsEventsContainer = bodyElement.querySelector('.trip-events__list');

const renderTripPoints = () => {
  for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
    const tripPointView = new TripPointView(tripPointsSort[i]);
    const tripPointAddEditView = new TripPointAddEditView(tripPointsSort[i]);

    const formHide = (evt) => {
      if (isEscEvent(evt.code)) {
        evt.preventDefault();
        tripControlsEventsContainer.replaceChild(tripPointView.getElement(), tripPointAddEditView.getElement());
        document.removeEventListener('keydown', formHide);
      }
    };

    tripPointView.setRollupBtnClickHandler(() => {
      tripControlsEventsContainer.replaceChild(tripPointAddEditView.getElement(), tripPointView.getElement());
      document.addEventListener('keydown', formHide);
    });

    tripPointAddEditView.setRollupBtnClickHandler(() => {
      tripControlsEventsContainer.replaceChild(tripPointView.getElement(), tripPointAddEditView.getElement());
      document.removeEventListener('keydown', formHide);
    });

    tripPointAddEditView.setFormSubmitHandler(() => {
      tripControlsEventsContainer.replaceChild(tripPointView.getElement(), tripPointAddEditView.getElement());
      document.removeEventListener('keydown', formHide);
    });

    render(tripControlsEventsContainer, tripPointView.getElement());
  }
};

renderTripPoints();
