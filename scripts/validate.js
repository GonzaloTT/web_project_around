function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(submitButtonSelector);

    function toggleButtonState() {
      if (form.checkValidity()) {
        button.disabled = false;
        button.classList.remove(inactiveButtonClass);
      } else {
        button.disabled = true;
        button.classList.add(inactiveButtonClass);
      }
    }

    function showError(input) {
      const errorSpan = input.nextElementSibling;
      errorSpan.textContent = input.validationMessage;
      errorSpan.classList.add(errorClass);
      input.classList.add(inputErrorClass);
    }

    function hideError(input) {
      const errorSpan = input.nextElementSibling;
      errorSpan.textContent = "";
      errorSpan.classList.remove(errorClass);
      input.classList.remove(inputErrorClass);
    }

    function resetForm() {
      inputs.forEach((input) => hideError(input));
      toggleButtonState();
    }

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          showError(input);
        } else {
          hideError(input);
        }
        toggleButtonState();
      });
    });

    form.resetValidation = resetForm;

    toggleButtonState();
  });
}
