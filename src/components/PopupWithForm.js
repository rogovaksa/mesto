import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._popupSubmitButton = this._popup.querySelector('.popup__save');
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  };

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  _getSubmitBtnText() {
    return this._popupSubmitButton.textContent;
  };

  _setLoadingText(text) {
    this._popupSubmitButton.textContent = text;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const submitBtnText = this._getSubmitBtnText();
      this._setLoadingText('Сохранение...');
      this._handleSubmit(this._getInputValues())
      .then(() => this.closePopup())
      .finally(() => {
        this._setLoadingText(submitBtnText);
      })
    });
  };

}

export default PopupWithForm;
