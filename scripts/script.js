const editButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const photoPopup = document.querySelector('.photo-popup');
const newForm = document.querySelector('#new-card');
const closePopup = document.querySelector('.popup__close')
const nameInfo = document.querySelector('.profile-info__title');
const jobInfo = document.querySelector('.profile-info__text');
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#job');
// Находим форму в DOM  
const inputNameCard = document.querySelector('#name-card');// нашли поля инпутов
const inputLinkCard = document.querySelector('#link-card');
const formElement = document.querySelector('.popup__container');
const closePhoto = document.querySelector('#close-photo');
//загрузка карточек на страницу  
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardTemplate = document.querySelector('#card').content;
const elementBlock = document.querySelector('.elements');
//сделаем новую переменную для кнопки закрытия второго попапа  
const closeCards = document.querySelector('#close');
// добавление второго попапа  
const addButton = document.querySelector('.profile__add-button');
//переменные для содержимого инпутов  
const formCard = document.querySelector('#form');
const imagePopup = document.querySelector('.photo-popup__img')
const imageText = document.querySelector('.photo-popup__text')
const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}
inputName.value = nameInfo.textContent;
inputJob.value = jobInfo.textContent;
//загружаем карточки на страницу  
function createCard(link, name) {
    const cardClone = cardTemplate.cloneNode(true);
    const image = cardClone.querySelector('.element__image')
    const cardName = cardClone.querySelector('.element__text')
    const like = cardClone.querySelector('.element__btn');//находим кнопку лайк  
    const trash = cardClone.querySelector('.element__trash');//кнопка удаления карточки 
    const card = cardClone.querySelector('.element');
    cardName.textContent = name;
    image.src = link;
    image.alt = name;
    like.addEventListener('click', function (event) {
        event.target.closest('.element__btn').classList.toggle('element__btn_active');
    });
    trash.addEventListener('click', function (event) {
        event.target.closest('.element').remove();
    });
    image.addEventListener('click', openPhotoPopup);
    return card
}
// добавление карточки в разметку
function addCard(card, container) {
    container.prepend(card);
}
//добавление изначальных карточек в разметку
function render() {
    initialCards.forEach(item => {
        const cards = createCard(item.link, item.name);
        addCard(cards, elementBlock);
    });
}
render()
//функция открытие попапа с фоткой
function openPhotoPopup(card) {
    const cardContainer = card.target.closest('.element');
    const zoomPhoto = cardContainer.querySelector('.element__image');
    const zoomText = cardContainer.querySelector('.element__text');
    imagePopup.src = zoomPhoto.src;
    imagePopup.alt = zoomText.alt;
    imageText.textContent = zoomText.textContent;
    openForm(photoPopup);
}
//значения не сохраненных инпутов при открытии
function SaveTrueInfo() {
    inputName.value = nameInfo.textContent;
    inputJob.value = jobInfo.textContent;
}
//сброс значений ипутов у формы добавления карточки
function resetForm() {
    formCard.reset();
}
enableValidation(validationConfig);
function openForm(openModalWindow) {
    openModalWindow.classList.add('popup_opened')
    document.addEventListener('keydown', pushEsc);
}
//закрытие формы 
function closeForm(closeModalWindow) {
    closeModalWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', pushEsc);
}
//нажатие на клавишу
function pushEsc(evt) {
    if (evt.key === 'Escape') {
        const windowOpen = document.querySelector('.popup_opened')
        closeForm(windowOpen);
    };
}
//добавление карточки
function submitCard(evt) {
    evt.preventDefault();
    const newCard = createCard(inputLinkCard.value, inputNameCard.value)
    addCard(newCard, elementBlock)
    closeForm(newForm);
}
//сохранение формы  
function submitUserInfo(evt) {
    evt.preventDefault();
    nameInfo.textContent = inputName.value;
    jobInfo.textContent = inputJob.value;
    closeForm(popup);
}
//закрытие профиля на клик по оверлею 
function closeOnOverlayClick(item) {
    if (item.target.classList.contains('popup')) {
        const openWindow = document.querySelector('.popup_opened');
        closeForm(openWindow)
    }
}
formCard.addEventListener('submit', submitCard);
formElement.addEventListener('submit', submitUserInfo);
//кнопка открытия формы профиля
editButton.addEventListener('click', () => {
    openForm(popup);
    resetValid(validationConfig, popup)//при открытии проходит валидация
    SaveTrueInfo();//в инпутах формы всегда текст с профиля
});
closePopup.addEventListener('click', () => { closeForm(popup); });
//кнопка открытия формы добавления фотки
addButton.addEventListener('click', () => {
    openForm(newForm);
    resetValid(validationConfig, newForm)//при открытии проходит валидация
    resetForm()//форма сбрасывает значения
});
closeCards.addEventListener('click', () => { closeForm(newForm); });
closePhoto.addEventListener('click', () => { closeForm(photoPopup); });//зыкрыть фотку
//закрытие профиля
popup.addEventListener('click', closeOnOverlayClick);
//закрытие нового места
newForm.addEventListener('click', closeOnOverlayClick);
//закрытие попапа с фоткой
photoPopup.addEventListener('click', closeOnOverlayClick);
