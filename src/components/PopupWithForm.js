import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor({ popupSelector, formSubmitCallback }) {
        super(popupSelector)
        this._formSubmitCallback = formSubmitCallback;
        this._formSubmitHandler = this._formSubmitHandler.bind(this);
        this._form = document.getElementById('form')
    }
    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value
        });
        return this._formValues;
    }
    _close() {
        super.close();
        this._form.reset()
    }
    _formSubmitHandler(evt) {
        evt.preventDefault();
        this._formSubmitCallback(this._getInputValues());
        this._close()
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this._formSubmitHandler);
    }
}