import {render, replace, remove} from '../utils/render.js';
import {isEscEvent, isOnline} from '../utils/common.js';
import {toast} from '../utils/toast.js';
import {Mode, UpdateType, UserAction} from '../const.js';
import TripPointView from '../view/trip-point.js';
import TripPointEditView from '../view/trip-point-edit.js';

export const State = {
  SAVING: 'saving',
  DELETING: 'deleting',
  ABORTING: 'aborting',
};

export default class Point {
  constructor(tripPointsListContainer, changeMode, changeView) {
    this._tripPointsListContainer = tripPointsListContainer;

    this._changeMode = changeMode;

    this._changeOffer = changeView;
    this._changeFavorite = changeView;
    this._deletePoint = changeView;
    this._formSubmit = changeView;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;

    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleOpenBtnClick = this._handleOpenBtnClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);
    this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
    this._handleOfferClick = this._handleOfferClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint);

    this._tripPointComponent.setOpenBtnClickHandler(this._handleOpenBtnClick);
    this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._tripPointEditComponent = new TripPointEditView(tripPoint);

    this._tripPointEditComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);
    this._tripPointEditComponent.setDeleteBtnClickHandler(this._handleDeleteBtnClick);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmitClick);
    this._tripPointEditComponent.setChangeTripPointOfferHandler(this._handleOfferClick);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this._tripPointsListContainer, this._tripPointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripPointComponent, prevTripPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToTripPoint();
    }
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripPointEditComponent);
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._tripPointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      }, false);
    };

    switch (state) {
      case State.SAVING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        }, false);
        break;
      case State.DELETING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        }, false);
        break;
      case State.ABORTING:
        this._tripPointEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceTripPointToForm() {
    this._changeMode();
    this._mode = Mode.EDITING;

    const prevTripPointEditComponent = this._tripPointEditComponent;
    remove(prevTripPointEditComponent);

    this._tripPointEditComponent = new TripPointEditView(this._tripPoint);

    this._tripPointEditComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);
    this._tripPointEditComponent.setDeleteBtnClickHandler(this._handleDeleteBtnClick);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmitClick);
    this._tripPointEditComponent.setChangeTripPointOfferHandler(this._handleOfferClick);

    replace(this._tripPointEditComponent, this._tripPointComponent);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToTripPoint() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    const tripPointEdit = Object.assign(
      {},
      this._tripPoint,
      {
        isFavorite: !this._tripPoint.isFavorite,
      });

    this._changeFavorite(UserAction.UPDATE_POINT, UpdateType.PATCH, tripPointEdit);
  }

  _handleOpenBtnClick() {

    if (!isOnline()) {
      toast('You can\'t edit trip point offline');
      return;
    }

    this._replaceTripPointToForm();
  }

  _handleCloseBtnClick() {
    const tripPointEdit = Object.assign(
      {},
      this._tripPoint,
    );
    this._changeOffer(UserAction.CHANGE_OFFER, UpdateType.TRIP_COST, tripPointEdit);
    this._replaceFormToTripPoint();
  }

  _handleDeleteBtnClick(point) {

    if (!isOnline()) {
      toast('You can\'t delete trip point offline');
      return;
    }

    this._deletePoint(UserAction.DELETE_POINT, UpdateType.MAJOR, point);
  }

  _handleFormSubmitClick(point) {

    if (!isOnline()) {
      toast('You can\'t save point point offline');
      return;
    }

    const tripPointEdit = Object.assign(
      {},
      this._tripPoint,
      point,
    );
    this._formSubmit(UserAction.UPDATE_POINT, UpdateType.PATCH, tripPointEdit);
  }

  _handleOfferClick(point) {
    const tripPointEdit = Object.assign(
      {},
      this._tripPoint,
      point,
    );
    this._changeOffer(UserAction.CHANGE_OFFER, UpdateType.TRIP_COST, tripPointEdit);
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt.code)) {
      evt.preventDefault();

      const tripPointEdit = Object.assign(
        {},
        this._tripPoint,
      );
      this._changeOffer(UserAction.CHANGE_OFFER, UpdateType.TRIP_COST, tripPointEdit);

      this._replaceFormToTripPoint();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }
}
