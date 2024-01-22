export const openModal = (domElement) => {
  domElement.classList.add("popup_is-opened");
};

export const closeModal = (domElement) => {
  console.log("call closemodal");
  domElement.classList.add("popup_is-animated");
  domElement.classList.remove("popup_is-opened");
};
