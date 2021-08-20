import {TRIP_POINTS_COUNT} from './const.js';
import {render} from './utils/render.js';
import {compareDate} from './utils/common.js';
import {generatePoint} from './mock/point-mock.js';
import TripMenuView from './view/trip-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripPresenter from './presenter/trip.js';

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);
const tripPointsSort = tripPoints.sort(compareDate);

const bodyElement = document.querySelector('body');

const tripControlsEvents = bodyElement.querySelector('.trip-events');
const tripControlsNavigation = bodyElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = bodyElement.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter(bodyElement, tripControlsEvents);

render(tripControlsNavigation, new TripMenuView());
render(tripControlsFilters, new TripFiltersView());

tripPresenter.init(tripPointsSort);


/* if (tripPoints.length) {
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
} */
