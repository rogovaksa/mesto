class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(".popup__close");
  }

  _closeByEscape = (evt) => {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape' && openedPopup) {
      this.closePopup();
    }
  };

  // _handleCloseByOverlay = (evt) => {
  //   if (evt.target.classList.contains('popup')) {
  //     this.closePopup();
  //   }
  // };

  setEventListeners = () => {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup(this._popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        this.closePopup(this._popup);
      }
    });
    this._popupCloseBtn.addEventListener('click', () => this.closePopup());
  };

  // setEventListeners = () => {
  //   this._popup.addEventListener('mousedown', (evt) => {
  //     if (evt.target.classList.contains('popup_opened')) {
  //       this.closePopup(this._popup);
  //     }
  //     if (evt.target.classList.contains('popup__close')) {
  //       this.closePopup(this._popup);
  //     }
  // })
  // };

  openPopup = () => {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  };

  closePopup = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  };
}

export default Popup;
