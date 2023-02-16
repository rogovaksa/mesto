const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

function disableSubmit(event) {
  event.preventDefault();
};

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((form) => {
    form.addEventListener('submit', disableSubmit);

    form.addEventListener('input', () => {
    toggleButton(form, config);
    });

    addInputListners(form, config);
    toggleButton(form, config);

  });
};

function addInputListners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach(function(item) {
    item.addEventListener('input', (event) => {
      handleFormInput(event, config)
    });
  });
}

function handleFormInput(event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    input.classList.remove(config.errorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    input.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
  }
}

function toggleButton(form, config) {
  const buttonSubmit =  form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

enableValidation(formValidationConfig);
