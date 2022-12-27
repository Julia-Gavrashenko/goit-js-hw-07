import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryMarkup = createGalleryMarkup(galleryItems);

const galleryContainer = document.querySelector(".gallery");

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener(`click`, onImgOpenModal);

function createGalleryMarkup(items) {
  const markup = items
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link" 
       href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `;
    })
    .join("");

  return markup;
}

function onImgOpenModal(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const instance = basicLightbox.create(`
  <img src = "${event.target.dataset.source}">
`);
  instance.show();

  window.addEventListener(`keydown`, onImgCloseModal);

  function onImgCloseModal(event) {
    if (event.code === "Escape") {
      instance.close();
      window.removeEventListener(`keydown`, onImgCloseModal);
    }
  }
}
