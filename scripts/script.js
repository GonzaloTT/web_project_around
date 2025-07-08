const editButton = document.querySelector(".content__edit_button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");

// Abre el popup
editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
});

// Cierra el popup con la X
closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

// Cierra el popup haciendo clic fuera del contenedor
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.remove("popup_opened");
  }
});
