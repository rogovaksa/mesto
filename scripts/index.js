const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const openPopup = function() {
    popupElement.classList.add('popup_is-opened');
}

const closePopup = function() {
    popupElement.classList.remove('popup_is-opened');
}

const closePopupByClickOnOverlay = function(event) {
    if(event.target === event.currentTarget) {
    closePopup();
    }
}

let formElement = document.querySelector('.profile__info'); 
let nameInput = formElement.querySelector(".profile__name");
let jobInput = formElement.querySelector(".profile__description"); 

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameInput.textContent = nameInput.value; 
    jobInput.textContent = jobInput.value;  
    closePopupFormEdit();
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', handleFormSubmit);
