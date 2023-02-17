// Объявление переменных, popupEdit Редактировать профиль
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const popups = document.querySelectorAll('.popup');
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
function closeByEscape(evt) {
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
  });
  closePopup(popupAddElement);
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
