export class Card {
    constructor({ link, name, likes, id, owner, handleDelete, handleLike }, templateSelector, handleCardClick,) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._id = id;
        this._owner = owner;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteEvent = handleDelete;
        this._handleLikeEvent = handleLike;
    }
    //Получаем разметку карточки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }
    // Вставляем данные в разметку
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector(".element__likeNamber").textContent = this._likes;
        if (this._likes > 0) this._pressLike();
        if (this._owner) this._element.querySelector('.element__trash').classList.add('element__trash_owner');
        return this._element;
    }
    //лайк
    _pressLike() {
        this._element.querySelector('.element__btn').classList.toggle('element__btn_active');
    }
    //удаление карточки
    delete() {
        this._element.remove();
        this._element = null;
    }
    //Слушатель событий
    _setEventListeners() {
        this._element.querySelector('.element__btn').addEventListener('click', (event) => {
            this._pressLike();
            this._handleLikeEvent(event)
        });
        this._element.querySelector('.element__trash').addEventListener('click', this._handleDeleteEvent);
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick({ link: this.link, name: this._name });
        });
    }
}
