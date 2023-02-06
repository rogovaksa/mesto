
// Массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Объявление переменных, popupEdit Редактировать профиль
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const popupCloseButtonElement = document.querySelector(".popup__close");
const popupEditElement = document.querySelector(".popup_type_edit");
const popupFormEditElement = document.querySelector(".popup__form-edit");
const popupOpenAddButtonElement = document.querySelector(".profile__add-button");

// Объявление переменных, popupAdd Добавить карточку
const popupAddElement = document.querySelector(".popup_type_add");
const userNamePopupInput = document.querySelector(".popup__input_type_name");
const descriptionPopupInput = document.querySelector(".popup__input_type_descr");
const popupFormAddElement = document.querySelector(".popup__form-add");
const popupAddCardNameInput = document.querySelector(".popup__input_card_name");
const popupAddCardLinkInput = document.querySelector(".popup__input_card_link");

// Объявление переменных, popupPicture Открыть изображение на весь экран
const popupPictureElement = document.querySelector('.popup_type_picture');
const popupOpenedPictureElement = document.querySelector('.popup__picture');
const popupPictureDescriptionElement = document.querySelector('.popup__picture-descr');
const popupPictureCloseButtonElement = document.querySelector(".popup__close-picture");
const popupCloseAddButtonElement = document.querySelector('.popup__close_card');

// Объявление переменных, template образец карточки
const elementTemplate = document.querySelector("#element-template").content.querySelector(".element");
const elementsList = document.querySelector(".elements");

// Функция Открыть попап
function openPopup(elem) {
  elem.classList.add("popup_opened");
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

// Сохранить введенные данные popupEdit и закрыть попап
function submitPopupEditForm(event) {
  event.preventDefault();
  userName.textContent = userNamePopupInput.value;
  description.textContent = descriptionPopupInput.value;
  closePopupEditForm();
};

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
};
// Закрыть popupEdit
function closePopupEditForm() {
  closePopup(popupEditElement);
};
// Закрыть popupAdd
function closePopupAdd() {
  closePopup(popupAddElement);
};
// Закрыть popupPicture
function closePopupPicture() {
  closePopup(popupPictureElement);
};

// Сохранить данные popupAdd и закрыть попап
const submitPopupAddForm = (event) => {
  event.preventDefault();
  renderCard({
    name: popupAddCardNameInput.value,
    link: popupAddCardLinkInput.value,
  });
  event.target.reset();
  closePopup(popupAddElement);
};

// Лайк карточки
const cardLike = (event) => {
  event.target.classList.toggle("element__like-button_active");
};

// Добавить карточки
const createCard = (data) => {
  const cardElement = elementTemplate.cloneNode(true);
  const cardDescriptionElement = cardElement.querySelector(".element__description");
  const cardLikeElement = cardElement.querySelector(".element__like-button");
  const cardDeleteElement =cardElement.querySelector(".element__delete");
  const cardPictureElement = cardElement.querySelector(".element__picture");
  const descriptionElement = cardElement.querySelector(".element__description");

  cardPictureElement.src = data.link;
  cardDescriptionElement.textContent = data.name;

  function handleCardElement() {
    popupOpenedPictureElement.src = cardPictureElement.src;
    popupOpenedPictureElement.alt = descriptionElement.textContent;
    popupPictureDescriptionElement.textContent = descriptionElement.textContent;
    openPopup(popupPictureElement);
  }

  cardPictureElement.addEventListener("click", handleCardElement);
  cardDeleteElement.addEventListener("click", handleDeleteCard);
  cardLikeElement.addEventListener("click", cardLike);

  return cardElement;
};

const handleDeleteCard = (event) => {
  event.target.closest(".element").remove();
};

const renderCard = (data) => {
  elementsList.prepend(createCard(data));
};

initialCards.forEach((data) => {
  renderCard(data);
});

// Доп. ф-ция с вебинара, чтобы попап закрывался при клике вне формы
// const closePopupByClickOnOverlay = function(event) {
//     if(event.target === event.currentTarget) {
//     closePopup();
//     }
// }
// popupElement.addEventListener('click', closePopupByClickOnOverlay);

// Обработчики событий popups
popupFormEditElement.addEventListener("submit", submitPopupEditForm);
popupOpenButtonElement.addEventListener("click", openPopupEditForm);
popupFormAddElement.addEventListener("submit", submitPopupAddForm);
popupOpenAddButtonElement.addEventListener("click", openPopupAdd);
popupPictureCloseButtonElement.addEventListener("click", closePopupPicture);
popupCloseAddButtonElement.addEventListener("click", closePopupAdd);
popupCloseButtonElement.addEventListener("click", closePopupEditForm);
