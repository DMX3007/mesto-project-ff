import { checkAllFormValidity, clearValidationErrors } from './validation';

export const openModal = (domElement) => {
  clearValidationErrors(domElement);
  domElement.classList.add('popup_is-opened');

  // initial validation on empty inputs
  const inputs = Array.from(domElement.querySelectorAll('.popup__input'));
  const submitButton = domElement.querySelector('.popup__button');
  checkAllFormValidity(inputs, submitButton);

  domElement.addEventListener('click', (e) => {
    // close on outer modal click
    if (e.target === domElement) closeModal(domElement);
  });
  document.addEventListener('keydown', handleEscPressed);
};

export const closeModal = (domElement) => {
  domElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscPressed);
};

export function handleEscPressed(e) {
  if (e.key === 'Escape') {
    const opened = document.querySelector('.popup_is-opened');
    closeModal(opened);
  }
}
