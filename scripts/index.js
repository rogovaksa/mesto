// Объявление переменных, popupEdit Редактировать профиль
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const popupCloseButtonElement = document.querySelector('.popup__close');
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

// Объявление переменных, popupPicture Открыть изображение на весь экран
const popupPictureElement = document.querySelector('.popup_type_picture');
const popupOpenedPictureElement = document.querySelector('.popup__picture');
const popupPictureDescriptionElement = document.querySelector('.popup__picture-descr');
const popupPictureCloseButtonElement = document.querySelector('.popup__close-picture');
const popupCloseAddButtonElement = document.querySelector('.popup__close_card');

// Объявление переменных, template образец карточки
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
const elementsList = document.querySelector('.elements');

// Функция Открыть попап
function openPopup(elem) {
  elem.classList.add('popup_opened');
};
// Открыть popupAdd
function openPopupAdd() {
  openPopup(popupAddElement);
  document.addEventListener('keydown', closeAddPopupByClickOnEsc);
};

// Функция Открыть popupEdit с заполнением полей
function openPopupEditForm() {
  openPopup(popupEditElement);
  userNamePopupInput.value = userName.textContent;
  descriptionPopupInput.value = description.textContent;
  document.addEventListener('keydown', closeEditPopupByClickOnEsc);
};

// Сохранить введенные данные popupEdit и закрыть попап
function submitPopupEditForm(event) {
  event.preventDefault();
  userName.textContent = userNamePopupInput.value;
  description.textContent = descriptionPopupInput.value;
  closePopupEditForm();
};

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
// Закрыть popupEdit
function closePopupEditForm() {
  closePopup(popupEditElement);
  document.removeEventListener('keydown', closeEditPopupByClickOnEsc);
};
// Закрыть popupAdd
function closePopupAdd() {
  closePopup(popupAddElement);
  document.removeEventListener('keydown', closeAddPopupByClickOnEsc);

};
// Закрыть popupPicture
function closePopupPicture() {
  closePopup(popupPictureElement);
  document.removeEventListener('keydown', closePicturePopupByClickOnEsc);
};

// Закрыть popup при клике на оверлей
function closePopupByClickOnOverlay(event, popup) {
  if(event.target === event.currentTarget) {
    closePopup(popup);
  }
};
// Закрыть popupEdit при клике на оверлей
function closeEditPopupByClickOnOverlay() {
  closePopupByClickOnOverlay( event, popupEditElement);
};
// Закрыть popupAdd при клике на оверлей
function closeAddPopupByClickOnOverlay() {
  closePopupByClickOnOverlay(event, popupAddElement);
};
// Закрыть popupPicture при клике на оверлей
function closePicturePopupByClickOnOverlay() {
  closePopupByClickOnOverlay(event, popupPictureElement);
};

// Закрыть popupEdit при нажатии на оверлей Ecs
function closeEditPopupByClickOnEsc(e) {
  if (e.key == 'Escape') {
    closePopupEditForm()
  }
}
// Закрыть popupAdd при нажатии на оверлей Ecs
function closeAddPopupByClickOnEsc(e) {
  if (e.key == 'Escape') {
    closePopupAdd()
  }
}
// Закрыть popupPicture при нажатии на оверлей Ecs
function closePicturePopupByClickOnEsc(e) {
  if (e.key == 'Escape') {
    closePopupPicture()
  }
}

// Сохранить данные popupAdd и закрыть попап
const submitPopupAddForm = (event) => {
  event.preventDefault();
  renderCard({
    name: popupAddCardNameInput.value,
    link: popupAddCardLinkInput.value,
  });
  closePopupAdd();
  event.target.reset();
};

// Лайк карточки
const cardLike = (event) => {
  event.target.classList.toggle('element__like-button_active');
};

// Обработка введенных данных
function handleCardElement(name, link) {
  popupOpenedPictureElement.src = link
  popupOpenedPictureElement.alt = name
  popupPictureDescriptionElement.textContent = name
  openPopup(popupPictureElement)
  document.addEventListener('keydown', closePicturePopupByClickOnEsc);
}

// Добавить карточки
const createCard = (data) => {
  const cardElement = elementTemplate.cloneNode(true);
  const cardDescriptionElement = cardElement.querySelector('.element__description');
  const cardLikeElement = cardElement.querySelector('.element__like-button');
  const cardDeleteElement =cardElement.querySelector('.element__delete');
  const cardPictureElement = cardElement.querySelector('.element__picture');

  cardPictureElement.src = data.link;
  cardPictureElement.alt = data.name;
  cardDescriptionElement.textContent = data.name;

  handleCardElement;

  cardPictureElement.addEventListener('click', () => handleCardElement(data.name, data.link));
  cardDeleteElement.addEventListener('click', handleDeleteCard);
  cardLikeElement.addEventListener('click', cardLike);

  return cardElement;
};

const handleDeleteCard = (event) => {
  event.target.closest('.element').remove();
};

const renderCard = (data) => {
  elementsList.prepend(createCard(data));
};

initialCards.forEach((data) => {
  renderCard(data);
});

// Обработчики событий popups
popupFormEditElement.addEventListener('submit', submitPopupEditForm);
popupOpenButtonElement.addEventListener('click', openPopupEditForm);
popupFormAddElement.addEventListener('submit', submitPopupAddForm);
popupOpenAddButtonElement.addEventListener('click', openPopupAdd);
popupPictureCloseButtonElement.addEventListener('click', closePopupPicture);
popupCloseAddButtonElement.addEventListener('click', closePopupAdd);
popupCloseButtonElement.addEventListener('click', closePopupEditForm);
popupEditElement.addEventListener('click', closeEditPopupByClickOnOverlay);
popupAddElement.addEventListener('click', closeAddPopupByClickOnOverlay);
popupPictureElement.addEventListener('click', closePicturePopupByClickOnOverlay);
