export const removeCard = (card) => {
  card.remove();
};

export function handleLikeButtonClicked(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

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
    .addEventListener("click", likeCardFn);

  cardElement
    .querySelector(".card__likes")
    .textContent = cardContent.likes.length;

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", clickCardFn);

  cardElement
    .querySelector(".card__description")
    .querySelector(".card__title").textContent = cardContent.name;
  
    return cardElement;
};
