
let textDate = "";
let videoTitle = "";


//***** factory de création de l'UserCardDOM pour la galerie ********/

function getUserCardDOM(dataGal, firstName, slide_Nb, previous) {
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
    textDate ="VIDÉO► "+ date ;
    let stopMotion = video.substring(0,(video.length-3))+'jpg';
    console.log(stopMotion);
    let vidContentPath = `./assets/photographers/${artistFirstName}/${stopMotion}`;
    videoTitle = "► ";
    const artistVideo = document.createElement("div");     
    let attributes = {
      class: "galerieVideo",
      alt: `Vidéo de ${artistFirstName} nommée ${title}`,
      tabindex: "0",
      onclick: `openLightbox();currentSlide(${slide_Nb})`,
      onkeydown: "if(event.keyCode == 13){event.target.click()}",
    };
    createDiv(artistVideo, attributes, "", articleGalerie);
    const videoSource = document.createElement("img");
    attributes = {
      src: vidContentPath,
      alt: `Vidéo de ${artistFirstName} nommée ${title}`
    };
    createDiv(videoSource, attributes, "", artistVideo);
  }

  const dateDiv = document.createElement("div");
  createDiv(dateDiv, { class: "dateDiv" }, textDate, articleGalerie);

  const titleDiv = document.createElement("div");
  createDiv(titleDiv, { class: "titleDiv" }, "", articleGalerie);

  const mediaTitle = document.createElement("div");
  createDiv(mediaTitle, { class: "media-title", lang:"en" }, videoTitle + title, titleDiv);

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
  if (previous.includes(id)){
    mediaLikes.setAttribute("class","already");
    mediaLikes.innerText="♥"+likes+"^";}

  return articleGalerie;
}


