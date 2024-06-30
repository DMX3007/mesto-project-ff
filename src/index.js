import {
  removeCard,
  createCard,
  handleLikeButtonClicked,
} from "./components/card";
import { openModal, closeModal } from "./components/modal";
import {
  initializeValidation,
  validateInput,
  checkAllFormValidity,
} from "./components/validation";
import "../pages/index.css";
import {
  getUserData,
  getCards,
  sendCard,
  updateUserCredentials,
  changeAvatar,
} from "./components/api";

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

window.addEventListener("load", function () {
  document.body.style.visibility = "visible";
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.3s";
});

const currentUserId = await getUserData(
  profileTitle,
  profileDescription,
  profileAvatar
);
function loading(button, text) {
  button.textContent = text;
}
function removeFormEventListeners(popup) {
  const form = popup.querySelector(".popup__form");
  if (!form) return; // If there's no form in the popup, exit the function
  form.removeEventListener("input", checkAllFormValidity);

  let inputs = Array.from(form.elements).filter(
    (input) => input.type !== "submit"
  );
  inputs.forEach((input) => {
    input.removeEventListener("input", validateInput);
  });
}
function handleCloseButtonPressed() {
  const underlay = this.closest(".popup");
  closeModal(underlay);
  removeFormEventListeners(underlay);
}
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", handleCloseButtonPressed);
});

function addModalOpenerListener(element, popup) {
  element.addEventListener("click", (e) => {
    openModal(popup);
    initializeValidation();
    if (popup === popupEditProfile) {
      const nameInput = popup.querySelector(".popup__input_type_name");
      const descriptionInput = popup.querySelector(
        ".popup__input_type_description"
      );
      nameInput.value = profileTitle.textContent;
      descriptionInput.value = profileDescription.textContent;
    }
  });
}

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
  const res = await changeAvatar({ avatar: avatarUrl });
  if (!res.ok) {
    throw new Error("Failed to update avatar");
  }
  const updatedUser = await res.json();
  const avatar = document.querySelector(".profile__image");
  avatar.setAttribute("src", updatedUser.avatar);
  loading(submitButton,'Сохранить')
  closeModal(popupAvatarBlock)
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
  cardsList.append(card);
};
console.log();

async function handleProfileFormSubmit(e) {
  e.preventDefault();
  
  const saveButton = profileForm.elements[`save`] 
    loading(saveButton, 'Сохранение...')
    profileTitle.textContent =
    profileForm.elements.name.value;
  profileDescription.textContent =
    profileForm.elements.description.value;
  await updateUserCredentials({
    name: profileForm.elements.name.value,
    about: profileForm.elements.description.value,
  });
  loading(saveButton, 'Сохранить')
  profileForm.reset();
  profileForm.elements[2].textContent = 'Сохранить'
  closeModal(popupEditProfile);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);


addCardForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const saveButton = addCardForm.elements[`save`];
  loading(saveButton, 'Сохранение...')
  const placeInput = addCardForm.elements[`place-name`].value;
  const linkInput = addCardForm.elements.link.value;
  await sendCard({ name: placeInput, link: linkInput });
  const updatedCards = await getCards();
  cardsList.innerHTML = ''; 
  loading(saveButton, 'Сохранить');
  updatedCards.forEach((cardContent) => 
    renderCard(cardTemplate, cardContent, currentUserId)
  )
  addCardForm.reset();
  closeModal(popupNewCard);
});

const initialCards = await getCards();

initialCards.forEach((cardContent) =>
  renderCard(cardTemplate, cardContent, currentUserId)
);
addModalOpenerListener(profileEditButton, popupEditProfile);
addModalOpenerListener(profileAddButton, popupNewCard);
addModalOpenerListener(profileAvatarClickable, popupAvatarBlock);
