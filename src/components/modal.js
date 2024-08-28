export const openModal = (domElement) => {
  domElement.classList.add('popup_is-opened');
  // domElement.addEventListener('click', (e) => {
  //   // close on outer modal click
  //   if (e.target === domElement) closeModal(domElement);
  // });
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
