const editButton = document.querySelector(".content__edit_button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close_button");
const form = document.querySelector(".popup__content");

const nameInput = form.querySelectorAll(".popup__input")[0];
const aboutInput = form.querySelectorAll(".popup__input")[1];

const profileName = document.querySelector(".content__name");
const profileAbout = document.querySelector(".content__job");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");

  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  popup.classList.remove("popup_opened");
});
