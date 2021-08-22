import {render, replace} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';
import TripPointView from '../view/trip-point.js';
import TripPointEditView from '../view/trip-point-edit.js';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

export default class Point {
  constructor(tripPointsListContainer, changeMode, changeFavorite) {
    this._tripPointsListContainer = tripPointsListContainer;
    this._changeMode = changeMode;
    this._changeFavorite = changeFavorite;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleRolldownBtnClick = this._handleRolldownBtnClick.bind(this);
    this._handleRollupBtnClick = this._handleRollupBtnClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripPointEditComponent = new TripPointEditView(tripPoint);

    this._tripPointComponent.setRolldownBtnClickHandler(this._handleRolldownBtnClick);
    this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripPointEditComponent.setRollupBtnClickHandler(this._handleRollupBtnClick);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this._tripPointsListContainer, this._tripPointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripPointEditComponent, prevTripPointEditComponent);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToTripPoint();
    }
  }

  _replaceTripPointToForm() {
    this._changeMode();
    this._mode = Mode.EDITING;
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

    this._changeFavorite(tripPointEdit);
  }

  _handleRolldownBtnClick() {
    this._replaceTripPointToForm();
  }

  _handleRollupBtnClick() {
    this._replaceFormToTripPoint();
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt.code)) {
      evt.preventDefault();
      this._replaceFormToTripPoint();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }
}
