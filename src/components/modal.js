export const openModal = (domElement) => {
  domElement.classList.add("popup_is-opened");
  domElement.addEventListener("click", (e) => {
    // close on outer modal click
    if (e.target === domElement) closeModal(domElement);
  });
};

export const closeModal = (domElement) => {
  domElement.classList.remove("popup_is-opened");
};
