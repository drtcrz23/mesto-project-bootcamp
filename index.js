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
let editPopup = document.querySelector('.popup-edit');
let editButton = document.querySelector('.profile__button-edit');

let addPopup = document.querySelector('.popup-add');
let addButton = document.querySelector('.profile__button-add');

let closeButtonAdd = document.querySelector('.popup__close_add');
let closeButtonEdit = document.querySelector('.popup__close_edit');
let closeButtonImage = document.querySelector('.popup__close_image');

let elements = document.querySelector('.elements');


let popupAddForm = document.querySelector('.popup-add__form');
let popupEditForm = document.querySelector('.popup-edit__form');

let name = popupEditForm.elements.name;
let description = popupEditForm.elements.description;
let newName = document.querySelector('.profile__name');
let newDescription = document.querySelector('.profile__description');

let imagePopup = document.querySelector('.popup-image');
let imagePopup_Image = document.querySelector('.popup-image__image');
let imagePopup_Text = document.querySelector('.popup-image__text');

//ДОБАВЛЕНИЕ КАРТОЧКИ
function openAddPopup() {
    addPopup.classList.add('popup_opened-add');
}

function closeAddPopup() {
    addPopup.classList.remove('popup_opened-add');
}

addButton.addEventListener('click', () => {
    openAddPopup();
})

closeButtonAdd.addEventListener('click', () => {
    closeAddPopup();
});

popupAddForm.addEventListener('submit', function (event) {
    createCard(popupAddForm.elements.name.value, popupAddForm.elements.link.value);
    event.preventDefault();
    closeAddPopup();
});


//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function openEditPopup() {
    editPopup.classList.add('popup_opened-edit');
}

function closeEditPopup() {
    editPopup.classList.remove('popup_opened-edit');
}

editButton.addEventListener('click', () => {
    openEditPopup()
})

closeButtonEdit.addEventListener('click', () => {
    closeEditPopup();
});

popupEditForm.addEventListener('submit', function (event) {
    newName.textContent = name.value;
    newDescription.textContent = description.value;
    event.preventDefault();
    closeEditPopup();
});

function closeImagePopup() {
    imagePopup.classList.remove('popup-image_opened');
}
closeButtonImage.addEventListener('click', () => {
    closeImagePopup();
});

//ПРОСМОТР КАРТОЧЕК

function createCard(name, url) {
    let template = document.querySelector('#element-template');
    let newCard = template.content.cloneNode(true);

    newCard.querySelector('.element__title').textContent = name;
    newCard.querySelector('.element__image').setAttribute('src', url);
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
        imagePopup.classList.add('popup-image_opened');
        imagePopup_Image.src = url;
        imagePopup_Image.alt = name;
        imagePopup_Text.textContent = name;
    });

    elements.prepend(newCard);
    return newCard;
}

function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        let card = initialCards[i];
        let name = card.name;
        let url = card.link;
        createCard(name, url);
    }
}

addCards();
