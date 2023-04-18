import "./index.css";

import {
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
} from "../utils/constants.js";
import {initialCards} from "../utils/initialCards.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Сохранить введенные данные popupEdit и закрыть попап
function submitPopupEditForm({ name, description }) {
  userInfo.getUserInfo({ name, description });
  name = userNamePopupInput.value;
  description = descriptionPopupInput.value;
  userInfo.setUserInfo({ name, description });
  popupEditForm.closePopup();
};

// Рендеринг карточки
const createCard = (data) => {
  const card = new Card(data, '#element-template', handleCardClick);
  return card.generateCard();
};

const renderCard = (data, wrap) => {
  const card = createCard(data);
  wrap.prepend(card);
};

// Сохранить данные popupAdd и закрыть попап
const submitPopupAddForm = (evt) => {
  renderCard({
    name: popupAddCardNameInput.value,
    link: popupAddCardLinkInput.value,
  }, elementsList);
  popupAddForm.closePopup();
  evt.target.reset();
};

// Открыть popupPicture при клике на карточку
function handleCardClick(name, link) {
  popupOpenedPictureElement.src = link
  popupOpenedPictureElement.alt = name
  popupPictureDescriptionElement.textContent = name

  popupPicture.openPopup();
};

// Экземпляр класса PopupWithImage
const popupPicture = new PopupWithImage('.popup_type_picture');
popupPicture.setEventListeners();

// Экземпляры класса PopupWithForm
const popupEditForm = new PopupWithForm('.popup_type_edit', submitPopupEditForm);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('.popup_type_add', submitPopupAddForm);
popupAddForm.setEventListeners();

// Создание экземпляра класса Section, рендеринг карточек
const itemList = new Section({
  items: initialCards,
  renderer: (data) => {
      const card = new Card(data, '#element-template', handleCardClick);
      const cardElement = card.generateCard();
      itemList.addItem(cardElement);
  }
}, '.elements');

itemList.renderItems();

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// Обработчики событий popup
popupFormEditElement.addEventListener('submit', submitPopupEditForm);
popupOpenButtonElement.addEventListener('click', popupEditForm.openPopup);
popupFormAddElement.addEventListener('submit', submitPopupAddForm);
popupOpenAddButtonElement.addEventListener('click', popupAddForm.openPopup);

// Создание экземпляров класса FormValidator
const validFormpopupAdd = new FormValidator(formValidationConfig, '.popup_type_add');
validFormpopupAdd.enableValidation();

const validFormpopupEdit = new FormValidator(formValidationConfig, '.popup_type_edit');
validFormpopupEdit.enableValidation();
