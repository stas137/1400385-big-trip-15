import TripPointEditView from '../view/trip-point-edit.js';

export default class PointNew {
  constructor(tripPointsContainer, changeData) {
    this._tripPointsContainer = tripPointsContainer;
    this._changeData = changeData;

    this._destroyCallback = null;
    this._tripPointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._tripPointEditComponent !== null) {
      return;
    }

    this._tripPointEditComponent = new TripPointEditView();
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit)
    this._tripPointEditComponent.setDeleteBtnClickHandler(this._handleDeleteBtnClick);
  }
}