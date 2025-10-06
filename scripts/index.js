import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closePopup, setPopupOverlayClose, setEscClose } from "./utils.js";

const editButton = document.querySelector(".content__button_edit");
const addButton = document.querySelector(".content__button_add");

const popupEdit = document.querySelector("#popup_edit");
const popupAdd = document.querySelector("#popup_add");
const closeButtons = document.querySelectorAll(".popup__button_close");

const editForm = popupEdit.querySelector(".popup__content");
const addForm = popupAdd.querySelector(".popup__content");

const nameInput = popupEdit.querySelector("#name_input");
const aboutInput = popupEdit.querySelector("#about_input");
const titleInput = popupAdd.querySelector("#title_input");
const urlInput = popupAdd.querySelector("#url_input");

const profileName = document.querySelector(".content__name");
const profileAbout = document.querySelector(".content__job");

const initialCards = [
  { name: "Valle de Yosemite", link: "images/Image_1.png" },
  { name: "Lago Louise", link: "images/Image_2.png" },
  { name: "Montañas Calvas", link: "images/Image_3.png" },
  { name: "Latemar", link: "images/Image_4.png" },
  { name: "Parque Nacional de la Vanoise", link: "images/Image_5.png" },
  { name: "Lago di Braies", link: "images/Image_6.png" },
];

const cardsContainer = document.querySelector(".cards");

initialCards.forEach((item) => {
  const card = new Card(item, "#template_card");
  cardsContainer.append(card.generateCard());
});

const config = {
  formSelector: "form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

document.querySelectorAll(config.formSelector).forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});

editButton.addEventListener("click", () => {
  popupEdit.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  editForm.resetValidation();
});

addButton.addEventListener("click", () => {
  popupAdd.classList.add("popup_opened");
  addForm.resetValidation();
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    closePopup(e.target.closest(".popup"));
  });
});

document.querySelectorAll(".popup").forEach((popup) => {
  setPopupOverlayClose(popup);
});

setEscClose();

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = new Card(
    { name: titleInput.value, link: urlInput.value },
    "#template_card"
  );
  cardsContainer.prepend(card.generateCard());
  closePopup(popupAdd);
  addForm.reset();
});
