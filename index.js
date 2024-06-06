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
const elements = document.querySelector('.elements');
const editPopup = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__button-edit');

const addPopup = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__button-add');

const popupEditForm = document.querySelector('.popup-edit__form');
const popupAddForm = document.querySelector('.popup-add__form');

const closeAddButton = document.querySelectorAll('.popup-add__close');
const closeEditButton = document.querySelectorAll('.popup-edit__close');

const name = popupEditForm.elements.name;
const description = popupEditForm.elements.description;

const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');


//ДОБАВЛЕНИЕ КАРТОЧКИ
addButton.addEventListener('click', () => {
    addPopup.classList.add('popup-add__opened');
});
closeAddButton.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => popup.classList.remove('popup-add__opened'));
});


//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
editButton.addEventListener('click', () => {
    name.value = userName.textContent;
    description.value = userJob.textContent;
    editPopup.classList.add('popup-edit__opened');
});

popupEditForm.addEventListener('submit', function (event) {
    userName.textContent = name.value;
    userJob.textContent = description.value;
    event.preventDefault();
    editPopup.classList.remove('popup-edit__opened');
});

closeEditButton.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => popup.classList.remove('popup-edit__opened'));
});


function getCard(name, link) {
    const template = document.querySelector('#element-template');
    const node = template.content.cloneNode(true);

    node.querySelector('.element__title').textContent = name;

    node.querySelector('.element').style.backgroundImage = `url(${link})`;
    node.querySelector('.element').style.backgroundSize = 'cover';

    node.querySelector('.element__like').addEventListener('click', likeHandler);
    node.querySelector('.element__button-delete').addEventListener('click', delHandler);

    node.querySelector('.element__image').addEventListener('click', () => {
        imageHandler(name, link);
    });

    return node;
}
function likeHandler(event) {
    event.target.classList.toggle('element__like_active');
    event.stopPropagation();
}

function delHandler(event) {
    elements.removeChild(event.target.closest('.element'));
    event.stopPropagation();
}
function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const cards = initialCards[i];
        const name = cards.name;
        const link = cards.link;
        createCard(name, link);
    }
}
addCards();

function createCard(name, link) {
    const placeCard = getCard(name, link);
    elements.prepend(placeCard);
}

const popupImage = document.querySelector('.popup-image');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImageText = document.querySelector('.popup-image__text');

function imageHandler(name, link) {
    popupImage.classList.add('popup-add__opened');
    popupImageImage.src = link;
    popupImageImage.alt = name;
    popupImageText.textContent = name;
}

function addCustomUserCard(event) {
    createCard(popupAddForm.name.value, popupAddForm.link.value);
    event.preventDefault();
    addPopup.classList.remove('popup-add__opened');
}
popupAddForm.addEventListener('submit', addCustomUserCard);
//ПРОСМОТР КАРТОЧЕК
