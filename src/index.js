import {
  removeCard,
  createCard,
  handleLikeButtonClicked,
} from "./components/card";
import { openModal, closeModal, handleEscPressed } from "./components/modal";
import {
  initializeValidation,
  validateInput,
  checkAllFormValidity,
} from "./components/validation";
import "../pages/index.css";

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageBlock = document.querySelector(".popup_type_image");

const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDesctiption = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const addCardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];

const fetchData = async (endPoint) => {
  const response = await fetch(
    `https://nomoreparties.co/v1/cohort-magistr-2/${endPoint}`,
    {
      headers: {
        authorization: "26c1ae51-9801-4bd2-af04-f2b12b773d26",
      },
    }
  );
  const data = await response.json();
  return data;
};

window.addEventListener('load', function() {
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.3s';
});

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

function addModalOpenerListener(button, popup) {
  button.addEventListener("click", (e) => {
    openModal(popup);
    initializeValidation();
    if (popup === popupEditProfile) {
      const nameInput = popup.querySelector(".popup__input_type_name");
      const descriptionInput = popup.querySelector(".popup__input_type_description");
      nameInput.value = profileTitle.textContent;
      descriptionInput.value = profileDesctiption.textContent;
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

const renderCard = (template, content) => {
  const card = createCard(
    template,
    content,
    removeCard,
    handleLikeButtonClicked,
    handleImageClick
  );
  cardsList.append(card);
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

const { name, about, avatar } = await fetchData("users/me");
profileTitle.textContent = name;
profileDesctiption.textContent = about;
profileAvatar.src = avatar;

const initialCards = await fetchData("cards");
initialCards.forEach((cardContent) => renderCard(cardTemplate, cardContent));
addModalOpenerListener(profileEditButton, popupEditProfile);
addModalOpenerListener(profileAddButton, popupNewCard);


// USER DATA
// const newProfileData = await fetch("https://nomoreparties.co/v1/cohort-magistr-2/users/me",{
//   method: 'PATCH',
//   headers: {
//     authorization: '26c1ae51-9801-4bd2-af04-f2b12b773d26',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
//   })
// });


/// POST
// const userCreds = await newProfileData.json();
// console.log(userCreds)

// const sendNewCard = await fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
//   method: 'POST',
//   headers: {
//     authorization: '26c1ae51-9801-4bd2-af04-f2b12b773d26',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     link: 'https://m.media-amazon.com/images/I/6155G1542kL._AC_.jpg'
//   })
// })

// const card = await sendNewCard.json();
// console.log(card)
