let maxHeight = window.screen.availHeight;
//***** factory de création de l'UserCardDOM pour lightbox ********/

function getUserCardDOMLightBox(dataGal, firstName) {
  let title = dataGal.title;
  let image = dataGal.image;
  let video = dataGal.video;
  const lightboxArticle = document.createElement("div");
  let attribs = {
    class: "mySlides",
    "aria-label": `galerie de ${firstName}`,
  };
  setListOfAttributes(lightboxArticle, attribs);

  if (dataGal.hasOwnProperty("image")) {
    let imgContentPath = `./assets/photographers/${firstName}/${image}`;
    const artistImg = document.createElement("img");
    let attributes = {
      src: imgContentPath,
      alt: title,
      class: "lightbox-img",
      tabindex: "0",
      height: maxHeight * 0.8,
    };
    createDiv(artistImg, attributes, "", lightboxArticle);
  } else if (dataGal.hasOwnProperty("video")) {
    let vidContentPath = `./assets/photographers/${firstName}/${video}`;
    const artistVideo = document.createElement("video");
    let attributes = {
      width: "95%",
      height: "auto",
      tabindex: "0",
      controls: "true",
      muted: "true",
      autoplay: "true",
      alt: title,
      class: "lightbox-img",
    };
    createDiv(artistVideo, attributes, "", lightboxArticle);
    const videoSource = document.createElement("source");
    createDiv(videoSource, { src: vidContentPath }, "", artistVideo);
  }

  const titleDiv = document.createElement("div");
  createDiv(titleDiv, { class: "titleDiv", lang:"en"}, title, lightboxArticle);

  return lightboxArticle;
}
