export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        //нажатие на клавишу еск
        document.addEventListener('keydown', this._handleEscClose)
        //клик на оверлей
        document.addEventListener('mousedown', evt => {
            if (evt.target.classList.contains('popup')) this.close();
        });
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        //нажатие на клавишу еск
        document.removeEventListener('keydown', this._handleEscClose)
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }
    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }
}
