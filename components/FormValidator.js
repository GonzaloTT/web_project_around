export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._button = formElement.querySelector(config.submitButtonSelector);
  }

  _getErrorElement(input) {
    if (input.id) {
      const byId = this._formElement.querySelector(`#${input.id}-error`);
      if (byId) return byId;
    }
    return input.nextElementSibling;
  }

  _showError(input) {
    const errorSpan = this._getErrorElement(input);
    if (!errorSpan) return;
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const errorSpan = this._getErrorElement(input);
    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.classList.remove(this._config.errorClass);
    }
    input.classList.remove(this._config.inputErrorClass);
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    const shouldDisable = this._hasInvalidInput();
    this._button.disabled = shouldDisable;
    this._button.classList.toggle(
      this._config.inactiveButtonClass,
      shouldDisable
    );
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this._showError(input);
        } else {
          this._hideError(input);
        }
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputs.forEach((input) => this._hideError(input));
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
