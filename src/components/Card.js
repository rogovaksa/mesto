class Card {
  constructor( { name, link }, template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick;
}

_getTemplate() {
  const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
  return cardElement;
} //'#element-template'

_cardLike = () => {
  this._cardLikeElement.classList.toggle('element__like-button_active');
};

_handleDeleteCard = () => {
  this._cardElement.remove();
};

_setEventListeners = () => {
  this._cardPictureElement.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  this._cardDeleteElement.addEventListener('click', () => this._handleDeleteCard());
  this._cardLikeElement.addEventListener('click', () => this._cardLike());
};

generateCard = () => {
  this._cardElement = this._getTemplate();
  this._cardDescriptionElement = this._cardElement.querySelector('.element__description');
  this._cardLikeElement = this._cardElement.querySelector('.element__like-button');
  this._cardDeleteElement = this._cardElement.querySelector('.element__delete');
  this._cardPictureElement = this._cardElement.querySelector('.element__picture');

  this._cardPictureElement.src = this._link;
  this._cardPictureElement.alt = this._name;
  this._cardDescriptionElement.textContent = this._name;

  this._setEventListeners();

  return this._cardElement;
};

};

export default Card;
