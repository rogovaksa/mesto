// Объявление переменных, popup Редактировать профиль
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupFormElement = popupElement.querySelector('.popup__form');
const userNamePopupInput = popupElement.querySelector('.popup__input_type_name');
const descriptionPopupInput = popupElement.querySelector('.popup__input_type_descr');

// Открыть попап
const openPopup = function() {
    popupElement.classList.add('popup_opened');
}
// Закрыть попап
const closePopup = function() {
    popupElement.classList.remove('popup_opened');
}

// Функция Открыть попап с заполнением полей
function openPopupForm() {
    openPopup();
    userNamePopupInput.value = userName.textContent;
    descriptionPopupInput.value = description.textContent;
};

// Функция Сохранить данные и Закрыть попап
function submitPopupForm(evt) {
    evt.preventDefault();
    userName.textContent = userNamePopupInput.value;
    description.textContent = descriptionPopupInput.value;
    closePopup();
  };

// Доп. фича с вебинара, чтобы попап закрывался при клике вне формы
// const closePopupByClickOnOverlay = function(event) {
//     if(event.target === event.currentTarget) {
//     closePopup();
//     }
// }

// Обработчики событий
popupOpenButtonElement.addEventListener('click', openPopupForm);
popupCloseButtonElement.addEventListener('click', closePopup);
popupFormElement .addEventListener("submit", submitPopupForm);
// popupElement.addEventListener('click', closePopupByClickOnOverlay);