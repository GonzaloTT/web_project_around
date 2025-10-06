export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._button = formElement.querySelector(config.submitButtonSelector);
  }

  _showError(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = "";
    errorSpan.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  }

  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._button.disabled = false;
      this._button.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._button.disabled = true;
      this._button.classList.add(this._config.inactiveButtonClass);
    }
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

  enableValidation() {
    this._formElement.resetValidation = () => {
      this._inputs.forEach((input) => this._hideError(input));
      this._toggleButtonState();
    };

    this._setEventListeners();
    this._toggleButtonState();
  }
}
