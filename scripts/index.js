const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const removeCard = (card) => {
  card.remove();
};

const createCard = (template, cardContent) => {
  const cardElement = template.querySelector(".places__item").cloneNode(true);

  cardElement
    .querySelector(".card__image")
    .setAttribute("src", cardContent.link);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      removeCard(cardElement);
    });

  cardElement
    .querySelector(".card__description")
    .querySelector(".card__title").textContent = cardContent.name;

  cardsList.append(cardElement);
};

initialCards.forEach((cardContent) => createCard(cardTemplate, cardContent));
