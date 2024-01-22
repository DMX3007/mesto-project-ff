import { initialCards } from "./components/cards";
import { removeCard, createCard } from "./components/card";
import "../pages/index.css";
import { openModal, closeModal } from "./components/modal";

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

// const popus = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

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
  handleClickOutsideModal();
}

function handleEscPressed(e) {
  const opened = document.querySelector(".popup_is-opened");
  if (e.key === "Escape" && opened) {
    closeModal(opened);
  }
}

document.addEventListener("click", (e) => {
  console.log(e.target);
});

const handleClickOutsideModal = () => {
  // document.querySelector(".popup_is-opened").addEventListener("click", (e) => {
  //   const opened = document.querySelector(".popup_is-opened");
  //   if (e.target.className.includes(".popup__content")) {
  //     closeModal(opened);
  //   }
  // });
};

function handleLikeButtonClicked(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

function handleImageClick(e) {
  openModal(popupImage);
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

const profileForm = document.forms["edit-profile"];

const nameInput = profileForm.children.name;
const jobInput = profileForm.children.description;

function handleFormSubmit(e) {
  e.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = job;

  profileForm.reset();
  closeModal(popupEditProfile);
}
profileForm.addEventListener("submit", handleFormSubmit);

const addCardForm = document.forms["new-place"];
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
