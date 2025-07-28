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

const template = document.querySelector("#template_card").content;
const cardsContainer = document.querySelector(".cards");

function createCard(name, link) {
  const cardElement = template.cloneNode(true).querySelector(".card");
  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__text");

  image.src = link;
  image.alt = name;
  title.textContent = name;

  const trash = cardElement.querySelector(".card__button_trash");
  const like = cardElement.querySelector(".card__button_like");

  image.addEventListener("click", () => {
    const popupImage = document.querySelector("#popup_image");
    const popupImg = popupImage.querySelector(".popup__image");
    const popupText = popupImage.querySelector(".popup__text");

    popupImg.src = link;
    popupImg.alt = name;
    popupText.textContent = name;

    popupImage.classList.add("popup_opened");
  });

  trash.addEventListener("click", () => cardElement.remove());
  like.addEventListener("click", () =>
    like.classList.toggle("card__button_like_active")
  );

  return cardElement;
}

initialCards.forEach(({ name, link }) => {
  cardsContainer.append(createCard(name, link));
});

editButton.addEventListener("click", () => {
  popupEdit.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

addButton.addEventListener("click", () => {
  popupAdd.classList.add("popup_opened");
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".popup").classList.remove("popup_opened");
  });
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupEdit.classList.remove("popup_opened");
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const url = urlInput.value;
  const newCard = createCard(title, url);
  cardsContainer.prepend(newCard);
  popupAdd.classList.remove("popup_opened");
  addForm.reset();
});
