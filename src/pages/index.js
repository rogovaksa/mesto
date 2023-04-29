import "./index.css";

import {
  popupOpenButtonElement,
  popupOpenAddButtonElement,
  popupOpenAvatar,
  userNamePopupInput,
  descriptionPopupInput,
  formValidationConfig,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import {api} from "../components/Api.js";

let userId;

// Получить данные с сервера
api.getUserInfo()
.then((res) => {
  userId = res._id;
  userInfo.setUserInfo(res) })
.catch((error) => console.log(`Ошибка: ${error}`))

api.getInitialCards()
.then((res) => {
  itemList.renderItems(res);
})
.catch((error) => console.log(`Ошибка: ${error}`))

// Лайк/дизлайк карточки
const handleLikeCard = (card) => {
  api.likeCard(card._cardId)
  .then((res) => {
    card.toggleCardLike();
    card._cardCountLike.textContent = res.likes.length;
  })
  .catch((err) => { console.log(err) });
};

const handleDislikeCard = (card) => {
  api.dislikeCard(card._cardId)
  .then((res) => {
    card.toggleCardLike();
    card._cardCountLike.textContent = res.likes.length;
  })
  .catch((err) => { console.log(err) });
};

// Подтвердить удаление карточки
function handleDeleteClick(card) {
  popupTypeConfirm.openPopup();
  popupTypeConfirm.handleSubmit(() => {
    const submitBtnText = popupTypeConfirm.getSubmitBtnText();
    popupTypeConfirm.setLoadingText('Удаление...');
    api.deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      popupTypeConfirm.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      popupTypeConfirm.setLoadingText(submitBtnText);
    });
  })
};

// Сохранить введенные данные popupEdit
function submitPopupEditForm(data) {
  const submitBtnText = popupEditForm.getSubmitBtnText();
  popupEditForm.setLoadingText('Сохранение...');
  api.patchUserInfo(data)
  .then((res) => { userInfo.setUserInfo(res) })
  .catch((error) => console.log(`Ошибка: ${error}`))
  .finally(() => {
    popupEditForm.setLoadingText(submitBtnText);
  });
};

// Сохранить введенные данные popupAdd
function submitPopupAddForm(data) {
  const submitBtnText = popupAddForm.getSubmitBtnText();
  popupAddForm.setLoadingText('Сохранение...');
  api.createNewCard(data)
  .then((res) => {renderCard(res)})
  .catch((error) => console.log(`Ошибка: ${error}`))
  .finally(() => {
    popupAddForm.setLoadingText(submitBtnText);
  });
};

// Сохранить введенные данные popupAvatar
function submitPopupAvatarForm(item) {
  const submitBtnText = popupAvatarForm.getSubmitBtnText();
  popupAvatarForm.setLoadingText('Сохранение...');
  api.patchAvatar(item)
  .then((res) => { userInfo.setUserInfo(res) })
  .catch((error) => console.log(`Ошибка: ${error}`))
  .finally(() => {
    popupAvatarForm.setLoadingText(submitBtnText);
  });
};

// Открыть popupPicture при клике на карточку
function handleCardClick(name, link) {
  popupPicture.openPopup(name, link);
};

// Заполнить поля формы данными из профиля
function handleTextInput() {
  const  userObject = userInfo.getUserInfo();
  userNamePopupInput.value = userObject.name;
  descriptionPopupInput.value = userObject.about;
};

// Функция создания карточки
const createCard = (...args) => {
  return new Card(...args).generateCard();
}

// Рендеринг карточки
const renderCard = (element) => {
  const card = createCard(element, '#element-template', handleCardClick, handleLikeCard, handleDislikeCard, handleDeleteClick, userId);
  itemList.addItem(card);
}

// Экземпляр класса Section (рендеринг карточек)
const itemList = new Section({
  renderer: renderCard,
}, '.elements');

// Экземпляр класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

// Экземпляр класса PopupWithImage
const popupPicture = new PopupWithImage('.popup_type_picture');
popupPicture.setEventListeners();

// Экземпляры класса PopupWithForm
const popupEditForm = new PopupWithForm('.popup_type_edit', submitPopupEditForm);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('.popup_type_add', submitPopupAddForm);
popupAddForm.setEventListeners();

const popupAvatarForm = new PopupWithForm ('.popup_type_avatar', submitPopupAvatarForm);
popupAvatarForm.setEventListeners();

// Экземпляр класса PopupWithConfirm
const popupTypeConfirm = new PopupWithConfirm({popupSelector: '.popup_type_confirm'});
popupTypeConfirm.setEventListeners();

// Создание экземпляров класса FormValidator
const validFormpopupAdd = new FormValidator(formValidationConfig, '.popup_type_add');
validFormpopupAdd.enableValidation();

const validFormpopupEdit = new FormValidator(formValidationConfig, '.popup_type_edit');
validFormpopupEdit.enableValidation();

const validFormpopupAvatar = new FormValidator(formValidationConfig, '.popup_type_avatar');
validFormpopupAvatar.enableValidation();

// Обработчики событий popup
popupOpenButtonElement.addEventListener('click', () => {
  popupEditForm.openPopup();
  handleTextInput();
});
popupOpenAddButtonElement.addEventListener('click', () => popupAddForm.openPopup());
popupOpenAvatar.addEventListener('click', () => popupAvatarForm.openPopup());
