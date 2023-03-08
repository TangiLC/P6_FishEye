let maxHeight = window.screen.availHeight;
let textDate = "";
let videoTitle = "";

//*** fonction pour attribuer une liste de paire attribut/key à un objet ***/
function setListOfAttributes(el, attrs) {
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
}

//*** fonction pour créer attributs et innertext dans une div affectée à parent **/
function createDiv(elementName, Attribute_key, elemInnerText, parentTarget) {
  Object.keys(Attribute_key).forEach((key) =>
    elementName.setAttribute(key, Attribute_key[key])
  );
  elementName.innerText = elemInnerText;
  parentTarget.appendChild(elementName);
}

//***** factory de création de l'UserCardDOM pour la galerie ********/

function getUserCardDOM(dataGal, firstName, slide_Nb) {
  let { id, phId, title, image, video, likes, date, price } = dataGal;
  let artistFirstName = firstName;
  const articleGalerie = document.createElement("article");
  let attribs = {
    class: "content_card",
    ariaLabel: `galerie de ${artistFirstName}`,
  };
  setListOfAttributes(articleGalerie, attribs);

  if (dataGal.hasOwnProperty("image")) {
    textDate = date;
    let imgContentPath = `./assets/photographers/${artistFirstName}/mini_${image}`;
    videoTitle = "";
    const artistImg = document.createElement("img");
    let attributes = {
      src: imgContentPath,
      alt: `Photo de ${artistFirstName} nommée ${title}`,
      tabindex: "0",
      onclick: `openLightbox();currentSlide(${slide_Nb})`,
      onkeydown: "if(event.keyCode == 13){event.target.click()}",
    };
    createDiv(artistImg, attributes, "", articleGalerie);
  } else if (dataGal.hasOwnProperty("video")) {
    textDate = date + " V I D É O ►";
    let vidContentPath = `./assets/photographers/${artistFirstName}/${video}`;
    videoTitle = "► ";
    const artistVideo = document.createElement("video");
    let attributes = {
      class: "galerieVideo",
      width: "350px",
      height: "300px",
      muted: "true",
      alt: `Vidéo de ${artistFirstName} nommée ${title}`,
      tabindex: "0",
      onclick: `openLightbox();currentSlide(${slide_Nb})`,
      onkeydown: "if(event.keyCode == 13){event.target.click()}",
    };
    createDiv(artistVideo, attributes, "", articleGalerie);
    const videoSource = document.createElement("source");
    createDiv(videoSource, { src: vidContentPath }, "", artistVideo);
  }

  const dateDiv = document.createElement("div");
  createDiv(dateDiv, { class: "dateDiv" }, textDate, articleGalerie);

  const titleDiv = document.createElement("div");
  createDiv(titleDiv, { class: "titleDiv" }, "", articleGalerie);

  const mediaTitle = document.createElement("div");
  createDiv(mediaTitle, { class: "media-title" }, videoTitle + title, titleDiv);

  const mediaLikes = document.createElement("button");
  let attributes = {
    class: "mediaLikes",
    tabindex: "0",
    onclick: `addOneLike(${id})`,
    ariaLabel: "nombre de likes",
    title: "nombre de likes",
    onkeydown: "if(event.keyCode == 13){event.target.click()}",
  };
  createDiv(mediaLikes, attributes, likes + "❤", titleDiv);

  return articleGalerie;
}

//***** factory de création de l'UserCardDOM pour lightbox ********/

function getUserCardDOMLightBox(dataGal, firstName) {
  let title = dataGal.title;
  let image = dataGal.image;
  let video = dataGal.video;
  var artistFirstName = firstName;
  const lightboxArticle = document.createElement("div");
  let attribs = {
    class: "mySlides",
    "aria-label": `galerie de ${artistFirstName}`,
  };
  setListOfAttributes(lightboxArticle, attribs);

  if (dataGal.hasOwnProperty("image")) {
    let imgContentPath = `./assets/photographers/${artistFirstName}/${image}`;
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
    let vidContentPath = `./assets/photographers/${artistFirstName}/${video}`;
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
  createDiv(titleDiv, { class: "titleDiv" }, title, lightboxArticle);

  return lightboxArticle;
}
