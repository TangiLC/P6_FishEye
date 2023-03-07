let maxHeight = window.screen.availHeight
let textDate = ''

//*** fonction pour attribuer une liste de paire attribut/key à un objet ***/
function setListOfAttributes (el, attrs) {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))
}

//*** fonction pour créer attributs et innertext dans une div affectée à parent **/
function createDiv (elementName, Attribute_key, elemInnerText, parentTarget) {
  Object.keys(Attribute_key).forEach(key =>
    elementName.setAttribute(key, Attribute_key[key])
  )
  elementName.innerText = elemInnerText
  parentTarget.appendChild(elementName)
  console.log('création de '+elementName)
}

//***** factory de création de l'UserCardDOM pour la galerie ********/

function getUserCardDOM (dataGal, firstName, slide_Nb) {
  let { id, phId, title, image, video, likes, date, price } = dataGal
  let artistFirstName = firstName
  const articleGalerie = document.createElement('article')
  let attribs = {
    class: 'content_card',
    ariaLabel: `galerie de ${artistFirstName}`
  }
  setListOfAttributes(articleGalerie, attribs)

  if (dataGal.hasOwnProperty('image')) {
    textDate = date
    let contentPath = `./assets/photographers/${artistFirstName}/mini_${image}`
    var videoTitle = ''
    const artistImg = document.createElement('img')
    let attributes = {
      src: contentPath,
      alt: title,
      tabindex: '0',
      onclick: `openLightbox();currentSlide(${slide_Nb})`,
      onkeydown: 'if(event.keyCode == 13){event.target.click()}'
    }
    createDiv(artistImg, attributes, '', articleGalerie)
  } else if (dataGal.hasOwnProperty('video')) {
    textDate = date + ' V I D É O ►'
    let contentPath = `./assets/photographers/${artistFirstName}/${video}`
    var videoTitle = '► '
    const artistVideo = document.createElement('video')
    let attributes = {
      class: 'galerieVideo',
      width: '350px',
      height: '300px',
      muted: 'true',
      alt: title,
      tabindex: '0',
      onclick: `openLightbox();currentSlide(${slide_Nb})`,
      onkeydown: 'if(event.keyCode == 13){event.target.click()}'
    }
    createDiv(artistVideo, attributes, '', articleGalerie)
    const videoSource = document.createElement('source')
    createDiv(videoSource, { src: contentPath }, '', artistVideo)
  }

  const dateDiv = document.createElement('div')
  createDiv(dateDiv, { class: 'dateDiv' }, textDate, articleGalerie)

  const titleDiv = document.createElement('div')
  createDiv(titleDiv, { class: 'titleDiv' }, '', articleGalerie)

  const mediaTitle = document.createElement('div')
  createDiv(mediaTitle, { class: 'media-title' }, videoTitle + title, titleDiv)

  const mediaLikes = document.createElement('button')
  let attributes = {
    class: 'mediaLikes',
    tabindex: '0',
    onclick: `addOneLike(${id})`,
    ariaLabel: 'nombre de likes',
    'title': 'nombre de likes',
    onkeydown: 'if(event.keyCode == 13){event.target.click()}'
  }
  createDiv(mediaLikes, attributes, likes.toString() + '❤', titleDiv)

  return articleGalerie
}

//***** factory de création de l'UserCardDOM pour lightbox ********/

function getUserCardDOMLightBox (dataGal, firstName) {
  let title = dataGal.title
  let image = dataGal.image
  let video = dataGal.video
  var artistFirstName = firstName
  const lightboxArticle = document.createElement('div')
  let attribs = {
    class: 'mySlides',
    'aria-label': `galerie de ${artistFirstName}`
  }
  setListOfAttributes(lightboxArticle, attribs)

  if (dataGal.hasOwnProperty('image')) {
    let contentPath = `./assets/photographers/${artistFirstName}/${image}`
    const artistImg = document.createElement('img')
    let attributes = {
      src: contentPath,
      alt: title,
      class: 'lightbox-img',
      height: maxHeight * 0.8
    }
    createDiv(artistImg, attributes, '', lightboxArticle)
  } else if (dataGal.hasOwnProperty('video')) {
    let contentPath = `./assets/photographers/${artistFirstName}/${video}`
    const artistVideo = document.createElement('video')
    let attributes = {
      width: '95%',
      height: 'auto',
      tabindex: '0',
      controls: 'true',
      muted: 'true',
      label: title,
      class: 'lightbox-img'
    }
    createDiv(artistVideo, attributes, '', lightboxArticle)
    const videoSource = document.createElement('source')
    createDiv(videoSource, { src: contentPath }, '', artistVideo)
  }

  const titleDiv = document.createElement('div')
  createDiv(titleDiv, { class: 'titleDiv' }, title, lightboxArticle)

  return lightboxArticle
}

//***** factory de création de l'UserCardDOM pour index ********/

function getIndexCardDOM (data, artistNb) {
  const { name, id, city, country, tagline, price, portrait } = data[artistNb]
  console.log(data)
  const picture = `./assets/photographers/zzportrait/mini_${portrait}`
  let path = id + artistNb.toString().padStart(4, '0')
  const photographerpath = `photographer.html?id=${path}`
  const article = document.createElement('article')

  const baliseA = document.createElement('a')
  let attributes = { href: photographerpath, alt: `lien vers la page de ${name}` }
  setListOfAttributes(baliseA, attributes)
  article.appendChild(baliseA)

  const img = document.createElement('img')
  attributes = { src: picture, alt: `portrait de ${name}` }
  setListOfAttributes(img, attributes)
  baliseA.appendChild(img)

  const h2 = document.createElement('h2')
  createDiv(h2, {class: "PhotographerName"}, name, baliseA)

  const location = document.createElement('div')
  createDiv(location, {class: "location"}, (city + ', ' + country), baliseA)

  const motto = document.createElement('div')
  createDiv(motto, {class: "tagline"}, tagline, baliseA)

  const tarif = document.createElement('div')
  createDiv(tarif, {class:"price"}, (price + '€/jour'), baliseA)

  
  return article
}
