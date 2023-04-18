// Объявление переменных, popupEdit Редактировать профиль
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupFormEditElement = document.querySelector('.popup__form-edit');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');

// Объявление переменных, popupAdd Добавить карточку
const userNamePopupInput = document.querySelector('.popup__input_type_name');
const descriptionPopupInput = document.querySelector('.popup__input_type_descr');
const popupFormAddElement = document.querySelector('.popup__form-add');
const popupAddCardNameInput = document.querySelector('.popup__input_card_name');
const popupAddCardLinkInput = document.querySelector('.popup__input_card_link');

// Объявление переменных, popupPicture Открыть изображение на весь экран
const popupOpenedPictureElement = document.querySelector('.popup__picture');
const popupPictureDescriptionElement = document.querySelector('.popup__picture-descr');

// Объявление переменных, template образец карточки
const elementsList = document.querySelector('.elements');

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
  popupFormEditElement,
  popupOpenAddButtonElement,
  userNamePopupInput,
  descriptionPopupInput,
  popupFormAddElement,
  popupAddCardNameInput,
  popupAddCardLinkInput,
  popupOpenedPictureElement,
  popupPictureDescriptionElement,
  elementsList,
  formValidationConfig,
}
