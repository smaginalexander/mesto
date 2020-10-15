import { Popup } from "./Popup.js";
export class PopupWithSubmit extends Popup {
    constructor({ popupSelector, submitHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._card);
        });
    }
    open(card) {
        this._card = card;
        super.open();
    }
}