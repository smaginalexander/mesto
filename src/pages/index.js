"use strict";
import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
    photoPopup,
    validationConfig,
    profilePopup,
    addCardPopup,
    editButton,
    addButton,
    initialCards,
    inputName,
    inputJob,
    btn
} from "../utils/constants.js";
const profileValid = new FormValidator(validationConfig, profilePopup);
const addFormValid = new FormValidator(validationConfig, addCardPopup);
const popupWithPhoto = new PopupWithImage(photoPopup);
///функция для вставки
function putClassCard(item) {
    const card = new Card({
        link: item.link,
        name: item.name
    },
        '#card',
        () => popupWithPhoto.open({
            link: item.link,
            name: item.name
        }));
    const cardElement = card.generateCard();
    cards.addItem(cardElement);
}

//загрузка изначальных карточек
const cards = new Section({
    items: initialCards,
    renderer: item => {
        putClassCard(item)
    }
}, '.elements');

//попап редактирования профиля
const userInfo = new UserInfo({
    name: '.profile-info__title',
    info: '.profile-info__text',
});
const userInfoPopup = new PopupWithForm({
    popupSelector: profilePopup,
    formSubmitCallback: (data) => {
        userInfo.setUserInfo({
            newName: data.userName,
            newInfo: data.userJob,
        });
    }
})
//попап добавления карточки
const newCardPopup = new PopupWithForm({
    popupSelector: addCardPopup,
    formSubmitCallback: (data) => {
        putClassCard(data)
    }
})

addFormValid.enableValidation();
profileValid.enableValidation();
//кнопка открытия формы добавления фотки
addButton.addEventListener('click', () => {
    addFormValid.resetAllInputError();
    newCardPopup.open();
});
//кнопка открытия редадактирования профиля
editButton.addEventListener('click', () => {
    profileValid.resetAllInputError();
    btn.classList.remove('popup__btn_invalid');
    //текст в инпуте редактирования профиля
    const profileInfo = userInfo.getUserInfo()
    inputName.value = profileInfo.name
    inputJob.value = profileInfo.info
    userInfoPopup.open();
});
popupWithPhoto.setEventListeners()
userInfoPopup.setEventListeners()
newCardPopup.setEventListeners();
cards.renderElements();
