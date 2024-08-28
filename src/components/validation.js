export class FormValidator {
  constructor(form) {
    this.form = form;
    this.errorSelector = '.popup__error';
    // get access to this from validateInput passed as callback
    this.validateInput = this.validateInput.bind(this);
  }
  get formIsValid() { 
    return this.form.checkValidity();
  }
  validate() {
    this.setSubmitButtonState();
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', this.validateInput);
    });
  }
  
  validateInput(event) {
    const input = event.target;
    const inputIsValid = input.validity.valid;
    this.toggleShowErrorMessage(input, inputIsValid);
    this.setSubmitButtonState()
  }

  toggleShowErrorMessage (input, inputIsValid) {
    const errorMessage = input.parentNode.querySelector(
      `.popup__${input.name}-error`,
    );
    if (inputIsValid && errorMessage) {
      errorMessage.textContent = '';
    } else {
      errorMessage.textContent = input.validationMessage;
    }
  }

  clearValidationErrors() {
    const errorMessages = this.form.querySelectorAll(this.errorSelector);
    errorMessages.forEach((error) => {
      error.textContent = '';
    });
  }
  
  checkValidity() {
    const inputs = this.form.querySelectorAll('input');
    if  (inputs.length === 0) {
      return true;
    }
    return inputs.every((input) => input.validity.valid === true);
  }

  setSubmitButtonState() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (this.formIsValid) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
}
