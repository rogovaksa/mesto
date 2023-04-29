class Card {
  constructor(data, template, handleCardClick, handleLikeCard, handleDislikeCard, handleDeleteClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
}

  _getTemplate() {
    const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    this._cardLike = cardElement.querySelector('.element__like-button');
    this._cardDelete = cardElement.querySelector('.element__delete');
    this._cardPicture = cardElement.querySelector('.element__picture');
    this._cardCountLike = cardElement.querySelector('.element__like-counter');
    this._cardCountLike.textContent = this._likes.length;

    if (
    this._likes.filter((like) => like._id === this._userId)
      .length > 0
    ) {
      this._cardLike.classList.add("element__like-button_active");
    }

    return cardElement;
  } //'#element-template'

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._isOwner();

    this._cardPicture.src = this._link;
    this._cardElement.querySelector('.element__description').textContent = this._name;
    this._cardPicture.alt = this._name;

    return this._cardElement;
  };

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  toggleCardLike() {
    this._cardLike.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
    if (this._cardLike.classList.contains('element__like-button_active')) {
      this._handleDislikeCard(this);

    } else {
      this._handleLikeCard(this);
    }
  });

    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _isOwner() {
    if (this._ownerId !== this._userId) {
      this._cardDelete.remove();
    }
  }

};

export default Card;
