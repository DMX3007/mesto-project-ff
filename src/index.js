import { initialCards } from "./components/cards";
import {
  removeCard,
  createCard,
  handleLikeButtonClicked,
} from "./components/card";
import { openModal, closeModal, handleEscPressed } from "./components/modal";
import "../pages/index.css";

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageBlock = document.querySelector(".popup_type_image");

const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const addCardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];

function handleCloseButtonPressed() {
  const underlay = this.closest(".popup");
  closeModal(underlay);
}

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", handleCloseButtonPressed);
});

function addModalOpenerListener(button, popup) {
  button.addEventListener("click", (e) => {
    openModal(popup);
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

const renderCard = (template, content) => {
  const card = createCard(
    template,
    content,
    removeCard,
    handleLikeButtonClicked,
    handleImageClick
  );
  cardsList.prepend(card);
};

function handleProfileFormSubmit(e) {
  e.preventDefault();

  document.querySelector(".profile__title").textContent =
    profileForm.elements.name.value;
  document.querySelector(".profile__description").textContent =
    profileForm.elements.description.value;

  profileForm.reset();
  closeModal(popupEditProfile);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const placeInput = addCardForm.elements[`place-name`].value;
  const linkInput = addCardForm.elements.link.value;

  initialCards.push({ name: placeInput, link: linkInput });
  renderCard(cardTemplate, initialCards[0]);
  addCardForm.reset();
  closeModal(popupNewCard);
});

initialCards.forEach((cardContent) => renderCard(cardTemplate, cardContent));
addModalOpenerListener(profileEditButton, popupEditProfile);
addModalOpenerListener(profileAddButton, popupNewCard);
