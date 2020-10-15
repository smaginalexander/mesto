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
    close() {
        super.close();
        this._form.reset()
    }
    _formSubmitHandler(evt) {
        evt.preventDefault();
        this._formSubmitCallback(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (event) => this._formSubmitHandler(event))
    }
}