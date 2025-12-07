import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._submitButton = this._form.querySelector(".popup__button_save");
  }

  setSubmitAction(submitAction) {
    this._handleSubmitAction = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitAction();
    });
  }
}
