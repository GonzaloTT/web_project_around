export default class Card {
  constructor(
    { data, userId, handleCardClick, handleLikeClick, handleDeleteClick },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes || [];
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
      this._handleLikeClick(this._cardId);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId);
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  setLikes(newLikesArray) {
    this._likes = newLikesArray || [];

    if (this._likeCountElement) {
      this._likeCountElement.textContent = this._likes.length;
    }

    const isLiked = this._likes.some((like) => like._id === this._userId);

    if (isLiked) {
      this._likeButton.classList.add("card__button_like_active");
    } else {
      this._likeButton.classList.remove("card__button_like_active");
    }
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  removeCardElement() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__text");
    this._likeButton = this._element.querySelector(".card__button_like");
    this._trashButton = this._element.querySelector(".card__button_trash");
    this._likeCountElement = this._element.querySelector(".card__like-count");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    this.setLikes(this._likes);

    return this._element;
  }
}
