export const removeCard = (card) => {
  card.remove();
};

export const createCard = (
  template,
  cardContent,
  removeCardFn,
  likeCardFn,
  clickCardFn
) => {
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
    .querySelector(".card__like-button")
    .addEventListener("click", (e) => likeCardFn(e));

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", (e) => clickCardFn(e));

  cardElement
    .querySelector(".card__description")
    .querySelector(".card__title").textContent = cardContent.name;

  return cardElement;
};
