"use strict";
import './index.css';
import { Api } from '../components/Api.js';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { validationConfig } from "../utils/constants.js";

const photoPopup = document.querySelector('.photo-popup');
const profilePopup = document.querySelector('.profilePopup');
const addCardPopup = document.querySelector('.addCardPopup');
const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#job');
const btn = document.querySelector('.popup__btn');
const avatar = document.querySelector('.profile__change');
const avatarPopup = document.querySelector('.popup__newAvatar');
const confirm = document.querySelector('.popup__confirm');

const profileValid = new FormValidator(validationConfig, profilePopup);
const addFormValid = new FormValidator(validationConfig, addCardPopup);
const popupWithPhoto = new PopupWithImage(photoPopup);

//подключаемся к серверу
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: '6d48ba52-ec94-43bc-a696-2925494647b4',
        'Content-Type': 'application/json'
    }
})
//добавляем карточку в разметку
const cards = new Section({
    renderer: item => {
        putClassCard(item)
    }
}, '.elements');

// Постановка/снятие лайка
const likeCard = (event, card) => {
    const quantityLike = event.target.parentElement.querySelector(".element__likeNamber");
    if (!event.target.classList.contains("element__btn_active")) {
        api.unlikeCard(card._id)
            .then((res) => {
                quantityLike.textContent = res.likes.length;
            })
            .catch((err) => {
                alert(err);
            })
    } else {
        api.likeCard(card._id)
            .then((res) => {
                quantityLike.textContent = res.likes.length;
            })
            .catch((err) => {
                alert(err);
            })
    }
}

function putClassCard(item) {
    const card = new Card({
        link: item.link,
        name: item.name,
        likes: item.likes.length,
        id: item._id,
        owner: userId === item.owner._id,//айди юзера равно айди карточки
        handleDelete: () => {// открываю попап подтверждения
            confirmPopup.open(card)
        },
        handleLike: (event) => {// ставим лайк
            likeCard(event, card)
        }
    },
        '#card',
        () => popupWithPhoto.open({
            link: item.link,
            name: item.name
        }),
    );
    const cardElement = card.generateCard();
    cards.addItem(cardElement);
}

//попап подтверждения 
const confirmPopup = new PopupWithSubmit({
    popupSelector: confirm,
    submitHandler: (card) => {
        deleteCard(card);
    }

});

//удаления карточки
const deleteCard = (card) => {
    const deleteButton = document.querySelector('#delete');
    deleteButton.textContent = 'Удаление...'
    api.deleteCard(card._id)
        .then((res) => {
            card.delete();
            confirmPopup.close()
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            deleteButton.textContent = 'да'
        })
}

let userId = ''//глобальная переменная для айди 
//загрузка изначальных данных профиля и загрузка карточек
Promise.all([api.loadingUserInfo(), api.loadingCards()])
    .then(([user, initialCards]) => {
        userId = user._id;
        cards.renderElements(initialCards);
        userInfo.setUserInfo({
            newName: user.name,
            newInfo: user.about
        })
        userInfo.setAvatar(user.avatar),
            userInfo.setUserId(user.id);
    })
    .catch((err) => {
        alert(err);
    })



//попап редактирования профиля
const userInfo = new UserInfo({
    name: '.profile-info__title',
    info: '.profile-info__text',
    avatar: '.profile__avatar'
})

//редактировать инфу профиля
const userInfoPopup = new PopupWithForm({
    popupSelector: profilePopup,
    formSubmitCallback: (data) => {
        const buttonInfo = document.querySelector('#loadInfo');
        console.log(buttonInfo)
        buttonInfo.textContent = 'Сохранение...';
        api.redactUserInfo(data.userName, data.userJob)
            .then(result => {
                userInfo.setUserInfo({
                    newName: result.name,
                    newInfo: result.about,
                })
                userInfoPopup.close()
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                buttonInfo.textContent = 'Сохранить';
            })
    }
})

//попап загрузки нового аватара
const loadAvatar = new PopupWithForm({
    popupSelector: avatarPopup,
    formSubmitCallback: (data) => {
        loadingNewAvatar(data)
    }
})
//сохранить новый аватар
const loadingNewAvatar = (data) => {
    const buttonAvatar = document.querySelector('#loadAvatar');
    buttonAvatar.textContent = 'Сохранение...'
    api.patchNewAvatar(data)
        .then((res) => {
            userInfo.setAvatar(res.avatar);
            loadAvatar.close();
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            buttonAvatar.textContent = 'Сохранить';
        })
}

//попап добавления карточки
const newCardPopup = new PopupWithForm({
    popupSelector: addCardPopup,
    formSubmitCallback: (data) => {
        const buttonNewCard = document.querySelector('#save');
        buttonNewCard.textContent = 'Добавление...'
        api.loadNewCard(data.name, data.link)
            .then(result => {
                putClassCard({
                    name: data.name,
                    link: data.link,
                    likes: result.likes.length,
                    owner: result.owner
                })
                newCardPopup.close();
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                buttonNewCard.textContent = 'Создать';
            })
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
//открыть попап для нового аватара
avatar.addEventListener('click', () => {
    loadAvatar.open()
});
popupWithPhoto.setEventListeners()
userInfoPopup.setEventListeners()
newCardPopup.setEventListeners();
confirmPopup.setEventListeners()
loadAvatar.setEventListeners()
