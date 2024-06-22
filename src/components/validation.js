export function validateInput() {
  const isValid = this.validity.valid;
  if (!isValid) {
    showErrorMessage(this, this.validationMessage);
  } else {
    hideErrorMessage(this);
  }
}

export function clearValidationErrors(popup) {
  const errorMessages = popup.querySelectorAll('.popup__error');

  errorMessages.forEach(error => {
    error.textContent = '';
  });
}

function showErrorMessage(input) {
  const errorMessage = input.parentNode.querySelector(
    `.popup__${input.name}-error`
  );
  errorMessage.textContent = input.validationMessage;
}

function hideErrorMessage(input) {
  const errorMessage = input.parentNode.querySelector(
    `.popup__${input.name}-error`
  );
  errorMessage.textContent = "";
}

export function checkAllFormValidity(inputs, submitButton) {
  if (inputs.every((input) => input.validity.valid)) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
export function initializeValidation() {
  const forms = Array.from(document.querySelectorAll(".popup__form"));

  const form = forms.filter((form) =>
    form.parentNode.parentNode.classList.contains("popup_is-opened")
  );

  let submitButton;
  let inputs = [];

  for (let input of form[0].elements) {
    if (input.type !== "submit") {
      input.addEventListener("input", validateInput);
      inputs.push(input);
    } else {
      submitButton = input;
    }
  }

  form[0].addEventListener("input", () =>
    checkAllFormValidity(inputs, submitButton)
  );
}
