export default class Card {
  constructor({ name, link, handleCardClick }, templateSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDelete();
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__button_like_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__text");
    this._likeButton = this._element.querySelector(".card__button_like");
    this._trashButton = this._element.querySelector(".card__button_trash");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
