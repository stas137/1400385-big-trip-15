import AbstractView from './abstract.js';

const createLoadedAdditionalDataTemplate = () => '<p class="trip-events__msg">Additional data for trip points not loaded.<br>Try again later...</p>';

export default class LoadedAdditionalData extends AbstractView {
  getTemplate() {
    return createLoadedAdditionalDataTemplate();
  }
}
