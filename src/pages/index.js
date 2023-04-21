import "./index.css";

import {
  popupOpenButtonElement,
  popupOpenAddButtonElement,
  userNamePopupInput,
  descriptionPopupInput,
  formValidationConfig,
} from "../utils/constants.js";
import {initialCards} from "../utils/initialCards.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Сохранить введенные данные popupEdit и закрыть попап
function submitPopupEditForm(data) {
  userInfo.setUserInfo(data);
};

// Создать карточку
function createCard({ name, link }, template, handleCardClick) {
  const card = new Card({ name, link }, template, handleCardClick);
  return card.generateCard();
};

// Создание экземпляра класса Section, рендеринг карточек
const itemList = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
      const cardElement = createCard({ name, link }, '#element-template', handleCardClick);
      itemList.addItem(cardElement);
  },
}, '.elements');

itemList.renderItems();

// Сохранить данные popupAdd и закрыть попап
function submitPopupAddForm({ name, link }) {
  const newCard = createCard({ name, link }, '#element-template', handleCardClick);
  itemList.addItem(newCard);
};

// Открыть popupPicture при клике на карточку
function handleCardClick(name, link) {
  popupPicture.openPopup(name, link);
};

// Заполнить поля формы данными из профиля
function handleTextInput() {
  const { userName, description } = userInfo.getUserInfo();
  userNamePopupInput.value = userName;
  descriptionPopupInput.value = description;
};

// Экземпляр класса PopupWithImage
const popupPicture = new PopupWithImage('.popup_type_picture');
popupPicture.setEventListeners();

// Экземпляры класса PopupWithForm
const popupEditForm = new PopupWithForm('.popup_type_edit', submitPopupEditForm);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('.popup_type_add', submitPopupAddForm);
popupAddForm.setEventListeners();



// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// Обработчики событий popup
popupOpenButtonElement.addEventListener('click', () => {
  popupEditForm.openPopup();
  handleTextInput();
});
popupOpenAddButtonElement.addEventListener('click', () => popupAddForm.openPopup());

// Создание экземпляров класса FormValidator
const validFormpopupAdd = new FormValidator(formValidationConfig, '.popup_type_add');
validFormpopupAdd.enableValidation();

const validFormpopupEdit = new FormValidator(formValidationConfig, '.popup_type_edit');
validFormpopupEdit.enableValidation();
