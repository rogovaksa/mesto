import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__picture');
    this._description = this._popup.querySelector('.popup__picture-descr');
  }

  openPopup({ name, link }) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._description.textContent = name;
  }
}

export default PopupWithImage;
