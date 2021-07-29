import {tripMenu} from './view/trip-menu.js';
import {tripFilters} from './view/trip-filters.js';
import {tripInfo} from './view/trip-info.js';
import {tripRoute} from './view/trip-route.js';
import {tripCost} from './view/trip-cost.js';
import {tripSort} from './view/trip-sort.js';
import {editPoint} from './view/edit-point.js';
import {tripContent} from './view/trip-content.js';

const bodyDocument = document.querySelector('body');

const renderComponent = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

renderComponent(bodyDocument.querySelector('.trip-controls__navigation'), tripMenu(), 'beforeend');
renderComponent(bodyDocument.querySelector('.trip-controls__filters'), tripFilters(), 'beforeend');
renderComponent(bodyDocument.querySelector('.trip-main'), tripInfo(), 'beforeend');
renderComponent(bodyDocument.querySelector('.trip-info'), tripRoute(), 'beforeend');
renderComponent(bodyDocument.querySelector('.trip-info'), tripCost(), 'beforeend');
renderComponent(bodyDocument.querySelector('.trip-events'), tripSort(), 'beforeend');
renderComponent(bodyDocument.querySelector('.trip-events'), editPoint(), 'beforeend');
renderComponent(bodyDocument.querySelector('.trip-events'), tripContent(), 'beforeend');
