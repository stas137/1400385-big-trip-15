import AbstractView from './abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
    if (new.target === Smart) {
      throw new Error('Can\'t instantiate Smart, only concrete one.');
    }
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  updateElement() {

  }

  updateData() {

  }
}