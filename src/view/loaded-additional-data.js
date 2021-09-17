import AbstractView from './abstract.js';

const createLoadedAdditionalDataTemplate = () => '<p class="trip-events__msg">Not loaded additional data for trip points.<br>Try again later...</p>';

export default class LoadedAdditionalData extends AbstractView {
  getTemplate() {
    return createLoadedAdditionalDataTemplate();
  }
}
