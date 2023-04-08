import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Объявление переменных, popupEdit Редактировать профиль
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const popups = document.querySelectorAll('.popup');
// const popupCloseButtonElement = document.querySelector('.popup__close');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupFormEditElement = document.querySelector('.popup__form-edit');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');

// Объявление переменных, popupAdd Добавить карточку
const popupAddElement = document.querySelector('.popup_type_add');
const userNamePopupInput = document.querySelector('.popup__input_type_name');
const descriptionPopupInput = document.querySelector('.popup__input_type_descr');
const popupFormAddElement = document.querySelector('.popup__form-add');
const popupAddCardNameInput = document.querySelector('.popup__input_card_name');
const popupAddCardLinkInput = document.querySelector('.popup__input_card_link');

// Объявление переменных, template образец карточки
const elementsList = document.querySelector('.elements');

// Функция Открыть попап
export function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Открыть popupAdd
function openPopupAdd() {
  openPopup(popupAddElement);
};

// Функция Открыть popupEdit с заполнением полей
function openPopupEditForm() {
  openPopup(popupEditElement);
  userNamePopupInput.value = userName.textContent;
  descriptionPopupInput.value = description.textContent;
};

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Сохранить введенные данные popupEdit и закрыть попап
function submitPopupEditForm(event) {
  event.preventDefault();
  userName.textContent = userNamePopupInput.value;
  description.textContent = descriptionPopupInput.value;
  closePopup(popupEditElement);
};

// Закрыть попап при клике на 'Х' или оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
    })
});

// Закрыть popup при клике на Escape
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// Сохранить данные popupAdd и закрыть попап
const submitPopupAddForm = (event) => {
  event.preventDefault();
  renderCard({
    name: popupAddCardNameInput.value,
    link: popupAddCardLinkInput.value,
  }, elementsList);
  closePopup(popupAddElement);
  event.target.reset();
};

// Рендеринг карточек
const createCard = (data) => {
  const card = new Card(data, '#element-template');
  return card.generateCard();
};

const renderCard = (data, wrap) => {
  const card = createCard(data);
  wrap.prepend(card);
};

initialCards.forEach((data) => {
  renderCard(data, elementsList);
});

// Обработчики событий popups
popupFormEditElement.addEventListener('submit', submitPopupEditForm);
popupOpenButtonElement.addEventListener('click', openPopupEditForm);
popupFormAddElement.addEventListener('submit', submitPopupAddForm);
popupOpenAddButtonElement.addEventListener('click', openPopupAdd);

// Валидация форм
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

const validFormpopupAdd = new FormValidator(formValidationConfig, '.popup_type_add');
validFormpopupAdd.enableValidation();

const validFormpopupEdit = new FormValidator(formValidationConfig, '.popup_type_edit');
validFormpopupEdit.enableValidation();
