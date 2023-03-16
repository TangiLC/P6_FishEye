let artistFirstName = 'Mimi'
let subGalerie = []
let artistTotalLikes = 0
let artistTarif = 0
let slideNb = 1
let previousId = [] //liste des id des likes précédents pour interdire de like x2
const galerieSection = document.querySelector('.galerie-section')
  const lightboxGal = document.querySelector('.lightbox-content')

const stickDiv = document.querySelector('.stickyDiv')

//****** affichage du message sticky nombre de likes et tarif ******/
function stickyMessage () {
  stickDiv.innerHTML = ''
  const artistLikes = document.createElement('div')
  artistLikes.textContent = artistTotalLikes + '❤'
  stickDiv.appendChild(artistLikes)
  const artistPrice = document.createElement('div')
  artistPrice.textContent = artistTarif
  stickDiv.appendChild(artistPrice)
}

//***** fonction de tri de l"array d"objet selon key **************/
function sortingBy (param) {
  if (param == 'likes') {
    subGalerie.sort(function(a,b){return(b[param] - a[param])} 
    )
  } else {
    subGalerie.sort((a, b) =>
      a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0
    )
  }
  eraseDisplayDataG()
  displayDataG(subGalerie, previousId)
  slideNb = 1
}

//***** fonction efface et affiche à nouveau la galerie ***********/
function eraseDisplayDataG () {
  galerieSection.innerHTML = ''
  lightboxGal.innerHTML = ''
  stickDiv.innerHTML = ''
}

/*async*/ function displayDataG (sub, previous) {
  

  sub.forEach(medium => {
    const userCardDOM = getUserCardDOM(medium, artistFirstName, slideNb, previous)
    galerieSection.appendChild(userCardDOM)

    const userCardDOMLightBox = getUserCardDOMLightBox(medium, artistFirstName)
    lightboxGal.appendChild(userCardDOMLightBox)
    slideNb += 1
  })
  stickyMessage()
}

//****** Récupère les datas du photographe choisi et initialise l'affichage ****/
const artist = parseInt(window.location.search.slice(-4))

fetch('./data/photographers.json')
  .then(function (responseGal) {
    if (responseGal.status !== 200) {
      console.log('Problem. Status Code: ' + responseGal.status)
      return
    }

    responseGal.json().then(function (dataGal) {
      artistFirstName = dataGal.photographers[artist].name.split(' ')[0]
      const artistNb = dataGal.photographers[artist].id
      artistTarif = dataGal.photographers[artist].price + '€/jour'
      console.log(artistNb)
      for (let i = 0; i < dataGal.media.length; i++) {
        if (dataGal.media[i].photographerId == artistNb) {
          subGalerie.push(dataGal.media[i])
          artistTotalLikes += dataGal.media[i].likes
        }
      }

      console.log(subGalerie)
      displayDataG(subGalerie,previousId)
    })
  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err)
  })

//******************** lightbox  ********************************************/
// Open lightbox
const closeFocus = document.querySelector('.closeLightbox')
const arrowListen=document.querySelector('.lightbox-Modal');
function openLightbox () {
  document.getElementById('lightbox-Modal').style.display = 'block'
  closeFocus.focus({ focusVisible: true })
}

// Close lightbox
function closeLightbox () {
  document.getElementById('lightbox-Modal').style.display = 'none'
}
slideNb = 1

// Next/previous controls
function plusSlides (n) {
  showSlides((slideNb += n))
}

//affichage du slide n
function currentSlide (n) {
  showSlides((slideNb = n))
}

function showSlides (n) {
  var slides = document.getElementsByClassName('mySlides')
  if (n > slides.length) {
    slideNb = 1
  }
  if (n < 1) {
    slideNb = slides.length
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  slides[slideNb - 1].style.display = 'block'
  closeFocus.focus({ focusVisible: true })
}

arrowListen.onkeydown=function(event){
  switch (event.code){
    case 'ArrowLeft' : plusSlides(-1); break;
    case 'ArrowRight' : plusSlides(1); break;
    case 'Escape' : closeLightbox(); break;
  }
}

//********************* ajout de likes **********************************/
function resetLikeDisplay(moreLess){
    artistTotalLikes += moreLess
    stickyMessage()
    eraseDisplayDataG()
    slideNb = 1
    displayDataG(subGalerie,previousId)
}

function addOneLike (arg) {
  if (!previousId.includes(arg)) {
    for (let i = 0; i < subGalerie.length; i++) {
      if (subGalerie[i].id == arg) {
        subGalerie[i].likes += 1
        previousId.push(arg)
        console.log(previousId)
      }
    }
    resetLikeDisplay(+1)
    

  } else {
    let index=previousId.indexOf(arg)
    if (index>-1) {
       previousId.splice(index,1)
    }
    for (let i = 0; i < subGalerie.length; i++) {
      if (subGalerie[i].id == arg) {
        subGalerie[i].likes -= 1
      }
    }
    resetLikeDisplay(-1)
       
  }
}
