import { initialCards } from "./components/cards";
import { removeCard, createCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";
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
  const underlay = this.parentNode.parentNode;
  closeModal(underlay);
  document.removeEventListener("keydown", handleEscPressed);
}

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", handleCloseButtonPressed);
});

function addModalOpenerListener(button, popup) {
  button.addEventListener("click", (e) => {
    openModal(popup);
  });
  document.addEventListener("keydown", handleEscPressed);
}

function handleEscPressed(e) {
  const opened = document.querySelector(".popup_is-opened");
  if (e.key === "Escape" && opened) {
    closeModal(opened);
  }
}

function handleLikeButtonClicked(e) {
  e.target.classList.toggle("card__like-button_is-active");
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

function handleFormSubmit(e) {
  e.preventDefault();

  document.querySelector(".profile__title").textContent =
    profileForm.children.name;
  document.querySelector(".profile__description").textContent =
    profileForm.children.description;

  profileForm.reset();
  closeModal(popupEditProfile);
}
profileForm.addEventListener("submit", handleFormSubmit);

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const placeInput = addCardForm.children[`place-name`].value;
  const linkInput = addCardForm.children.link.value;

  initialCards.unshift({ name: placeInput, link: linkInput });
  renderCard(cardTemplate, initialCards[0]);
  addCardForm.reset();
  closeModal(popupNewCard);
});

initialCards.forEach((cardContent) => renderCard(cardTemplate, cardContent));
addModalOpenerListener(profileEditButton, popupEditProfile);
addModalOpenerListener(profileAddButton, popupNewCard);
