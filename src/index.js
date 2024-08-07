import "../pages/index.css"
import {
  changeAvatar,
  getCards,
  getUserData,
  sendCard,
  updateUserCredentials
} from "./components/api"
import {
  createCard,
  handleLikeButtonClicked,
  removeCard,
} from "./components/card"
import { closeModal, openModal } from "./components/modal"
import { FormValidator } from './components/validation'

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageBlock = document.querySelector(".popup_type_image");
const popupAvatarBlock = document.querySelector(".popup_type_edit_avatar");

const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const profileAvatarClickable = document.querySelector(
  ".profile__image-backdrop"
);
const addCardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];
const avatarForm = document.forms["edit-avatar"];
let currentUserId = undefined;

window.addEventListener("load", function () {
  document.body.style.visibility = "visible";
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.3s";
});

const cardValidator = new FormValidator(addCardForm);
const profileValidator = new FormValidator(profileForm);
const avatarValidator = new FormValidator(avatarForm);

cardValidator.validate();
profileValidator.validate();
avatarValidator.validate();

const getInfoAll = async () => {
  try {
    const {name, avatar, _id, about} = await getUserData();
    const initialCards = await getCards();
    profileTitle.textContent = name;
    profileDescription.textContent = about;
    profileAvatar.src = avatar;
    currentUserId = _id;
    initialCards.forEach((cardContent) =>
      renderCard(cardTemplate, cardContent, currentUserId)
    );
  } catch (error) {
    console.error(error);
  }
}

function loading(button, text) {
  button.textContent = text;
}

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup"));
  });
});

function handleImageClick(e) {
  const popupImage = document.querySelector(".popup__image");
  popupImage.setAttribute("src", e.target.getAttribute("src"));
  popupImage.setAttribute("alt", e.target.getAttribute("alt"));
  document.querySelector(".popup__caption").textContent =
    e.target.getAttribute("alt");
  openModal(popupImageBlock);
}

async function handleAvatarChange(e) {
  e.preventDefault();
  const avatarUrl = e.target.elements["link"].value;
  const submitButton = avatarForm.elements[`save`];
  loading(submitButton, "Сохранение...")
  try {
    const res = await changeAvatar({ avatar: avatarUrl });
    const updatedUser = await res.json();
    const avatar = document.querySelector(".profile__image");
    avatar.setAttribute("src", updatedUser.avatar);
  } catch (error) {
    console.error(error);
  } finally {
    loading(submitButton,'Сохранить')
    closeModal(popupAvatarBlock)
    avatarValidator.clearValidationErrors()
  }
}

avatarForm.addEventListener("submit", handleAvatarChange);

const renderCard = (template, content, userId) => {
  const card = createCard(
    template,
    content,
    userId,
    removeCard,
    handleLikeButtonClicked,
    handleImageClick
  );
  cardsList.prepend(card);
};

async function handleProfileFormSubmit(e) {
  e.preventDefault();
  
  const saveButton = profileForm.elements[`save`] 
  loading(saveButton, 'Сохранение...')
  profileTitle.textContent =
    profileForm.elements.name.value;
  profileDescription.textContent =
    profileForm.elements.description.value;
    try {
      await updateUserCredentials({
        name: profileForm.elements.name.value,
        about: profileForm.elements.description.value,
      });
    }catch (err) {
      console.error(err);
    } finally {
      loading(saveButton, 'Сохранить')
      profileForm.reset();
      profileValidator.clearValidationErrors()
      closeModal(popupEditProfile);
    }
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

addCardForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const saveButton = addCardForm.elements[`save`];
  loading(saveButton, 'Сохранение...')
  const placeInput = addCardForm.elements[`place-name`].value;
  const linkInput = addCardForm.elements.link.value;
  try {
    const card = await sendCard({ name: placeInput, link: linkInput });
    renderCard(cardTemplate, card, currentUserId);
  } catch (err) {
    console.error(err);
  } finally {
    loading(saveButton, 'Сохранить');
    addCardForm.reset();
    cardValidator.clearValidationErrors()
    closeModal(popupNewCard);
  }
});

getInfoAll();

profileEditButton.addEventListener("click", () => {
  openModal(popupEditProfile);
});
profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
});
profileAvatarClickable.addEventListener("click", () => {
  openModal(popupAvatarBlock);
});
