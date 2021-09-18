import {remove, render, RenderPosition} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';
import {UpdateType, UserAction} from '../const.js';
import TripPointEditView from '../view/trip-point-edit.js';

export default class PointNew {
  constructor(tripPointsContainer, changeData) {
    this._tripPointsContainer = tripPointsContainer;
    this._changeData = changeData;

    this._destroyCallback = null;
    this._tripPointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._tripPointEditComponent !== null) {
      return;
    }

    this._tripPointEditComponent = new TripPointEditView();
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripPointEditComponent.setDeleteBtnClickHandler(this._handleDeleteBtnClick);

    document.addEventListener('keydown', this._escKeyDownHandler);

    render(this._tripPointsContainer, this._tripPointEditComponent, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    if (this._tripPointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._tripPointEditComponent);
    this._tripPointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );

    this.destroy();
  }

  _handleDeleteBtnClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt.code)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
