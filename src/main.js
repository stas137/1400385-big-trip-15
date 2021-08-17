import {TRIP_POINTS_COUNT} from './const.js';
import {isEscEvent, compareDate} from './utils/common.js';
import {RenderPosition, render, replace} from './utils/render.js';
import TripMenuView from './view/trip-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripRouteView from './view/trip-route.js';
import TripCostView from './view/trip-cost.js';
import TripSortView from './view/trip-sort.js';
import TripPointsContainerView from './view/trip-points-container.js';
import TripPointView from './view/trip-point.js';
import TripPointAddEditView from './view/trip-point-add-edit.js';
import TripPointEmptyView from './view/trip-point-empty.js';
import {generatePoint} from './mock/point-mock.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);
const tripPointsSort = tripPoints.sort(compareDate);

const bodyElement = document.querySelector('body');
const tripControlsEvents = bodyElement.querySelector('.trip-events');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');

render(tripControlsNavigation, new TripMenuView().getElement());
render(tripControlsFilters, new TripFiltersView().getElement());

if (tripPoints.length) {
  const tripControlsMain = bodyElement.querySelector('.trip-main');

  render(tripControlsMain, new TripRouteView(tripPoints), RenderPosition.AFTERBEGIN);

  const tripControlsInfo = bodyElement.querySelector('.trip-info');

  render(tripControlsInfo, new TripCostView(tripPoints));
  render(tripControlsEvents, new TripSortView());
  render(tripControlsEvents, new TripPointsContainerView());

  const tripControlsEventsContainer = bodyElement.querySelector('.trip-events__list');

  const renderTripPoints = () => {
    for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
      const tripPointView = new TripPointView(tripPointsSort[i]);
      const tripPointAddEditView = new TripPointAddEditView(tripPointsSort[i]);

      const replacePointToForm = () => {
        replace(tripPointAddEditView, tripPointView);
      };

      const replaceFormToPoint = () => {
        replace(tripPointView, tripPointAddEditView);
      };

      const formHide = (evt) => {
        if (isEscEvent(evt.code)) {
          evt.preventDefault();
          replaceFormToPoint();
          document.removeEventListener('keydown', formHide);
        }
      };

      tripPointView.setRollupBtnClickHandler(() => {
        replacePointToForm();
        document.addEventListener('keydown', formHide);
      });

      tripPointAddEditView.setRollupBtnClickHandler(() => {
        replaceFormToPoint();
        document.removeEventListener('keydown', formHide);
      });

      tripPointAddEditView.setFormSubmitHandler(() => {
        replaceFormToPoint();
        document.removeEventListener('keydown', formHide);
      });

      render(tripControlsEventsContainer, tripPointView);
    }
  };

  renderTripPoints();
} else {
  render(tripControlsEvents, new TripPointEmptyView());
}
