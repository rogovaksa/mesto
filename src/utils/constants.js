// Объявление переменных, popupEdit Редактировать профиль
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');

// Объявление переменных, popupAdd Добавить карточку
const userNamePopupInput = document.querySelector('.popup__input_type_name');
const descriptionPopupInput = document.querySelector('.popup__input_type_descr');

// Валидация форм
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

export {
  popupOpenButtonElement,
  popupOpenAddButtonElement,
  userNamePopupInput,
  descriptionPopupInput,
  formValidationConfig,
}
