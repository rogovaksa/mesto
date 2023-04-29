import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__container_type_confirm');
    this._popupSubmitButton = this._popup.querySelector('.popup__save');
  }

  handleSubmit(evt) {
    this._submitHandler = evt;
  };

  getSubmitBtnText() {
    return this._popupSubmitButton.textContent;
  };

  setLoadingText(text) {
    this._popupSubmitButton.textContent = text;
  };

  setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this._submitHandler();
          this.closePopup();
      });
  };

}

export default PopupWithConfirm;
