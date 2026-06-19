// Initialize zoomable images.
$(document).ready(function () {
  window.medium_zoom = {
    update() {},
  };

  const pageWidth = () => {
    const page = document.querySelector(".post, .home-profile, main .container, .container");
    return page ? Math.round(page.getBoundingClientRect().width) : window.innerWidth;
  };

  const closeZoomLightbox = () => {
    const lightbox = document.querySelector(".zoom-lightbox");
    if (lightbox) {
      lightbox.remove();
      document.body.classList.remove("zoom-lightbox-open");
    }
  };

  const openZoomLightbox = (imageElement) => {
    closeZoomLightbox();

    const maxWidth = Math.max(280, Math.min(pageWidth(), window.innerWidth - 32));
    const maxHeight = Math.max(280, window.innerHeight - 80);
    const src = imageElement.currentSrc || imageElement.src;
    const alt = imageElement.getAttribute("alt") || "";
    const zoomBackground = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee";
    const lightbox = document.createElement("div");
    lightbox.className = "zoom-lightbox";
    lightbox.style.background = zoomBackground;

    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.style.maxWidth = `${maxWidth}px`;
    image.style.maxHeight = `${maxHeight}px`;
    lightbox.appendChild(image);

    lightbox.addEventListener("click", closeZoomLightbox);
    image.addEventListener("click", closeZoomLightbox);

    document.body.appendChild(lightbox);
    document.body.classList.add("zoom-lightbox-open");
  };

  $("[data-zoomable]").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    openZoomLightbox(this);
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      closeZoomLightbox();
    }
  });
});
