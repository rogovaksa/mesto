import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  };

  // метод, собирающий введенные данные инпутов формы
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  };

}

export default PopupWithForm;
