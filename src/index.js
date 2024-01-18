import { initialCards } from "../scripts/cards";
import "../pages/index.css";

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const removeCard = (card) => {
  card.remove();
};
const createCard = (template, cardContent, removeCardFn) => {
  const cardElement = template.querySelector(".places__item").cloneNode(true);

  cardElement
    .querySelector(".card__image")
    .setAttribute("src", cardContent.link);

  cardElement
    .querySelector(".card__image")
    .setAttribute("alt", cardContent.name);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => removeCardFn(cardElement));

  cardElement
    .querySelector(".card__description")
    .querySelector(".card__title").textContent = cardContent.name;

  return cardElement;
};

const renderCard = (template, content) => {
  const card = createCard(template, content, removeCard);
  cardsList.append(card);
};

initialCards.forEach((cardContent) => renderCard(cardTemplate, cardContent));
