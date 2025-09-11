export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function setPopupOverlayClose(popup) {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
}

export function setEscClose() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openPopup = document.querySelector(".popup_opened");
      if (openPopup) closePopup(openPopup);
    }
  });
}
