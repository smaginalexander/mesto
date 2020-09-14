import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = document.querySelector('.photo-popup__img');
        this._imageText = document.querySelector('.photo-popup__text');
    }
    open({ link, name }) {
        this._imagePopup.src = link;
        this._imagePopup.alt = name;
        this._imageText.textContent = name;
        super.open();
    }
}