class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = document.querySelector(formElement);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  _disableSubmit(event) {
    event.preventDefault();
  };

  // проверка валидности полей инпутов
  _handleFormInput = (input) => {
    this._inputId = input.id;
    this._errorElement = document.querySelector(`#${this._inputId}-error`);

    if (input.validity.valid) {
      input.classList.remove(this._inputErrorClass);
      input.classList.remove(this._errorClass);
      this._errorElement.textContent = '';
    } else {
      input.classList.add(this._inputErrorClass);
      input.classList.add(this._errorClass);
      this._errorElement.textContent = input.validationMessage;
    }
  };

  _hasInvalidInputs() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButton = () => {
    if (this._hasInvalidInputs()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  _addInputListners() {
    // this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleButton();
        this._handleFormInput(input);
      });
    });
  }

  enableValidation() {
    this._formList = document.querySelectorAll(this._formSelector);

    this._formList.forEach(() => {
      this._formElement.addEventListener('submit', () => {
        this._disableSubmit()
      });

      this._formElement.addEventListener('input', () => {
        this._toggleButton();
      });

      this._formElement.addEventListener('reset', () => {
        setTimeout(() => {
          this._toggleButton(), 0 })
      });

      this._addInputListners();
      this._toggleButton();
    });
  };


};

export default FormValidator;
