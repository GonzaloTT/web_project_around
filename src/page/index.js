import Card from "../../components/Card.js";
import Section from "../../components/Section.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import PopupWithForm from "../../components/PopupWithForms.js";
import UserInfo from "../../components/UserInfo.js";
import FormValidator from "../../components/FormValidator.js";
import Api from "../../components/Api.js";
import PopupWithConfirmation from "../../components/PopupWithConfirmation.js";

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

const editButton = document.querySelector(".content__button_edit");
const addButton = document.querySelector(".content__button_add");

const popupEditSelector = "#popup_edit";
const popupAddSelector = "#popup_add";
const popupImageSelector = "#popup_image";
const popupConfirmSelector = "#popup_confirm";
const popupAvatarSelector = "#popup_avatar";
const avatarEditButton = document.querySelector(".content__button_avatar_edit");

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

let cardSection;
let userId;

function createCard(item) {
  const card = new Card(
    {
      data: item,
      userId: userId,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },

      handleDeleteClick: (cardId) => {
        const executeDelete = () => {
          api
            .deleteCard(cardId)
            .then(() => {
              card.removeCardElement();
              popupConfirm.close();
            })
            .catch((err) => {
              console.error("Error al eliminar tarjeta:", err);
            });
        };
        popupConfirm.setSubmitAction(executeDelete);

        popupConfirm.open();
      },

      handleLikeClick: (cardId) => {
        if (card.isLiked()) {
          api
            .removeLike(cardId)
            .then((updateCard) => {
              card.setLikes(updateCard.likes);
            })
            .catch((err) => console.error(err));
        } else {
          api
            .addLike(cardId)
            .then((updateCard) => {
              card.setLikes(updateCard.likes);
            })
            .catch((err) => console.error(err));
        }
      },
    },
    "#template_card"
  );
  return card.generateCard();
}

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const popupConfirm = new PopupWithConfirmation(popupConfirmSelector);
popupConfirm.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, (formData) => {
  const originalButtonText = popupEditAvatar.getButtonText();
  popupEditAvatar.setButtonText("Guardando...");

  api
    .updateAvatar(formData.avatar_input)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.error("Error al actualizar el avatar:", err);
    })
    .finally(() => {
      popupEditAvatar.setButtonText(originalButtonText);
    });
});
popupEditAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditSelector, (formData) => {
  const originalButtonText = popupEditProfile.getButtonText();
  popupEditProfile.setButtonText("Guardando...");

  api
    .updateUserInfo({
      name: formData.name_input,
      about: formData.about_input,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      popupEditProfile.close();
    })
    .catch((err) => {
      console.error("Error al guardar perfil:", err);
    })
    .finally(() => {
      popupEditProfile.setButtonText(originalButtonText);
    });
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddSelector, (formData) => {
  const originalButtonText = popupAddCard.getButtonText();
  popupAddCard.setButtonText("Creando...");

  api
    .addCard({
      name: formData.title_input,
      link: formData.url_input,
    })
    .then((newCardData) => {
      const newCardElement = createCard(newCardData);
      cardSection.addItem(newCardElement);

      popupAddCard.close();
    })
    .catch((err) => {
      console.error("Error al agregar tarjeta:", err);
    })
    .finally(() => {
      popupAddCard.setButtonText(originalButtonText);
    });
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

avatarEditButton.addEventListener("click", () => {
  popupEditAvatar.open();
});

api
  .getUserInfo()
  .then((userData) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.error("Error al cargar la información del usuario:", err);
  });

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement);
        },
      },
      ".cards"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("Error al cargar las tarjetas iniciales:", err);
  });
