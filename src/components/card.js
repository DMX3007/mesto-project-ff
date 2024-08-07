import { addLike, deleteCard, removeLike } from './api'

export const removeCard = async (card, id) => {
  try {
      await deleteCard(id);
      card.remove();
  } catch (error) {
      console.error('Failed to delete card:', error);
  }
};

export async function handleLikeButtonClicked(e, cardId) {
  const isLiked = e.target.classList.toggle('card__like-button_is-active');
  const likesCounter = e.target.nextSibling.nextSibling;
  try {
    if (isLiked) {
      const response = await addLike(cardId);
      likesCounter.textContent = response.likes.length;
    } else {
      const response = await removeLike(cardId);
      likesCounter.textContent = response.likes.length;
    }
  } catch (err) {
    console.error('Failed to update likes:', err);
  } 
}

export const createCard = (
  template,
  cardContent,
  userId,
  removeCardFn,
  likeCardFn,
  clickCardFn,
) => {
  const cardElement = template.querySelector('.places__item').cloneNode(true);

  cardElement
    .querySelector('.card__image')
    .setAttribute('src', cardContent.link);

  cardElement
    .querySelector('.card__image')
    .setAttribute('alt', cardContent.name);

  if (cardContent.owner._id === userId) {
    cardElement
      .querySelector('.card__delete-button')
      .addEventListener('click', () => removeCardFn(cardElement, cardContent._id));
  } else {
    cardElement.querySelector('.card__delete-button').remove();
  }
  // Show ours old likes
  const likeButton = cardElement.querySelector('.card__like-button');
  if (cardContent.likes.some((like) => like._id === userId)) {
    likeButton.classList.toggle('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (e) => likeCardFn(e, cardContent._id));

  cardElement
    .querySelector('.card__image')
    .addEventListener('click', clickCardFn);

  cardElement
    .querySelector('.card__description')
    .querySelector('.card__title').textContent = cardContent.name;

  cardElement.querySelector('.card__likes').textContent = cardContent.likes.length;

  return cardElement;
};
