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
const editPopup = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__button-edit');

const addPopup = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__button-add');

const closeButtonAdd = document.querySelector('.popup__close_add');
const closeButtonEdit = document.querySelector('.popup__close_edit');
const closeButtonImage = document.querySelector('.popup__close_image');

const arrayOfElements = document.querySelector('.elements');


const popupAddForm = document.querySelector('.popup-add__form');
const popupEditForm = document.querySelector('.popup-edit__form');

const name = popupEditForm.elements.name;
const description = popupEditForm.elements.description;
const newName = document.querySelector('.profile__name');
const newDescription = document.querySelector('.profile__description');

const imagePopup = document.querySelector('.popup-image');
const imagePopupImage = document.querySelector('.popup-image__image');
const imagePopupText = document.querySelector('.popup-image__text');

//ДОБАВЛЕНИЕ КАРТОЧКИ
function openPopup(popup) {
    if (popup === editPopup) {
        name.value = newName.textContent;
        description.value = newDescription.textContent;
    }
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

addButton.addEventListener('click', () => {
    openPopup(addPopup);
})

closeButtonAdd.addEventListener('click', () => {
    closePopup(addPopup);
});

popupAddForm.addEventListener('submit', function (event) {
    addingCard(popupAddForm.elements.name.value, popupAddForm.elements.link.value);
    event.preventDefault();
    closePopup(addPopup);
    popupAddForm.reset();
});


//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
editButton.addEventListener('click', () => {
    openPopup(editPopup);
})

closeButtonEdit.addEventListener('click', () => {
    closePopup(editPopup);
});

closeButtonImage.addEventListener('click', () => {
    closePopup(imagePopup);
});

popupEditForm.addEventListener('submit', function (event) {
    newName.textContent = name.value;
    newDescription.textContent = description.value;
    event.preventDefault();
    closePopup(editPopup);
});

//ПРОСМОТР КАРТОЧЕК

function createCard(name, url) {
    const template = document.querySelector('#element-template');
    const newCard = template.content.cloneNode(true);

    newCard.querySelector('.element__title').textContent = name;
    newCard.querySelector('.element__image').setAttribute('src', url);
    newCard.querySelector('.element__image').setAttribute('alt', name);
    newCard.querySelector('.element__like').addEventListener('click', function (event) {
        event.target.classList.toggle('element__like_active');
        event.stopPropagation();
    });
    newCard.querySelector('.element__button-delete').addEventListener('click', function (event) {
            event.target.closest('.element').remove();
            event.stopPropagation();
        }
    );
    newCard.querySelector('.element__image').addEventListener('click', function () {
        openPopup(imagePopup);
        imagePopupImage.src = url;
        imagePopupImage.alt = name;
        imagePopupText.textContent = name;
    });

    return newCard;
}

function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const card = initialCards[i];
        const name = card.name;
        const url = card.link;
        addingCard(name, url);
    }
}

addCards();


function addingCard(name, link) {
    const card = createCard(name, link);
    arrayOfElements.prepend(card);
}