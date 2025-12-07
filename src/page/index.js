import Card from "../../components/Card.js";
import Section from "../../components/Section.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import PopupWithForm from "../../components/PopupWithForms.js";
import UserInfo from "../../components/UserInfo.js";
import FormValidator from "../../components/FormValidator.js";
import Api from "../../components/Api.js";

const apiConfig = {
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "4d4a65e1-ea25-4bad-8a48-f449b3c6260c",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiConfig);

const config = {
  formSelector: "form",
  inputSelector: "input.popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  { name: "Valle de Yosemite", link: "../images/Image_1.png" },
  { name: "Lago Louise", link: "../images/Image_2.png" },
  { name: "Montañas Calvas", link: "../images/Image_3.png" },
  { name: "Latemar", link: "../images/Image_4.png" },
  { name: "Parque Nacional de la Vanoise", link: "../images/Image_5.png" },
  { name: "Lago di Braies", link: "../images/Image_6.png" },
];

const editButton = document.querySelector(".content__button_edit");
const addButton = document.querySelector(".content__button_add");

const popupEditSelector = "#popup_edit";
const popupAddSelector = "#popup_add";
const popupImageSelector = "#popup_image";

const editForm = document.querySelector(`${popupEditSelector} form`);
const addForm = document.querySelector(`${popupAddSelector} form`);

const nameInput = editForm.querySelector("#name_input");
const aboutInput = editForm.querySelector("#about_input");
const titleInput = addForm.querySelector("#title_input");
const urlInput = addForm.querySelector("#url_input");

const userInfo = new UserInfo({
  nameSelector: ".content__name",
  jobSelector: ".content__job",
  avatarSelector: ".content__avatar",
});

function createCard(item) {
  const card = new Card(
    {
      name: item.name,
      link: item.link,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
    },
    "#template_card"
  );
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: [...initialCards].reverse(),
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards"
);

cardSection.renderItems();

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditSelector, (formData) => {
  userInfo.setUserInfo({
    name: formData.name_input,
    job: formData.about_input,
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddSelector, (formData) => {
  const newCard = createCard({
    name: formData.title_input,
    link: formData.url_input,
  });
  cardSection.addItem(newCard);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

const formValidators = {};
document.querySelectorAll(config.formSelector).forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  const formName = formElement.getAttribute("name");
  formValidators[formName] = validator;
  validator.enableValidation();
});

editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  aboutInput.value = currentUser.job;
  if (formValidators[editForm.getAttribute("name")]) {
    formValidators[editForm.getAttribute("name")].resetValidation();
  }
  popupEditProfile.open();
});

addButton.addEventListener("click", () => {
  if (formValidators[addForm.getAttribute("name")]) {
    formValidators[addForm.getAttribute("name")].resetValidation();
  }
  popupAddCard.open();
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.error("Error al cargar la información del usuario:", err);
  });
