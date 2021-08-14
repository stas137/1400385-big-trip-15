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
import TripPointInvitationView from './view/trip-point-invitation.js';
import {generatePoint} from './mock/point-mock.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);
const tripPointsSort = tripPoints.sort(compareDate);

const bodyElement = document.querySelector('body');
const tripControlsEvents = bodyElement.querySelector('.trip-events');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');

if (tripPoints.length) {

  const tripControlsMain = bodyElement.querySelector('.trip-main');

  render(tripControlsMain, new TripRouteView(tripPoints).getElement(), RenderPosition.AFTERBEGIN);

  const tripControlsInfo = bodyElement.querySelector('.trip-info');

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

      const rollupButtonPoint = tripPointView.getElement().querySelector('.event__rollup-btn');
      const formPointAddEdit = tripPointAddEditView.getElement().querySelector('form');
      const rollupButtonForm = formPointAddEdit.querySelector('.event__rollup-btn');

      rollupButtonPoint.addEventListener('click', () => {
        const formHide = (evt) => {
          evt.preventDefault();
          formPointAddEdit.removeEventListener('submit', formHide);
          rollupButtonForm.removeEventListener('click', formHide);
          tripControlsEventsContainer.replaceChild(tripPointView.getElement(), tripPointAddEditView.getElement());
        };

        const formHideEsc = (evt) => {
          if (isEscEvent(evt.code)) {
            document.removeEventListener('keydown', formHideEsc);
            formHide(evt);
          }
        };

        tripControlsEventsContainer.replaceChild(tripPointAddEditView.getElement(), tripPointView.getElement());
        formPointAddEdit.addEventListener('submit', formHide);
        rollupButtonForm.addEventListener('click', formHide);
        document.addEventListener('keydown', formHideEsc);
      });

      render(tripControlsEventsContainer, tripPointView.getElement());
    }
  };

  renderTripPoints();

} else {
  render(tripControlsNavigation, new TripMenuView().getElement());
  render(tripControlsFilters, new TripFiltersView().getElement());
  render(tripControlsEvents, new TripPointInvitationView().getElement());
}
