/*structure media.json{
			"id": nb,
			"photographerId": nb,
			"title": string,
			"image": string url,
          **or "video":  string url,
			"likes": nb,
			"date": string format yyyy-mm-dd,
			"price": nb
		},*/
let artistFirstName="Mimi";
let subGalerie=[];
let contentPath="";
let artistTotalLikes=0;
let artistTarif=0;
let slideNb=1;
let maxHeight=window.screen.height;


function sortingBy(param){
    if (param=="title"){subGalerie.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));}
    if (param=="likes"){subGalerie.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0));}
    if (param=="date"){subGalerie.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));}
    alert('sorting by '+param);
    eraseDisplayDataG();
    slideNb=1;
    displayDataG(subGalerie);
  }

//const sortByTitle=document.getElementById("sortTitle"); sortByTitle.addEventListener("click", sortingBy('title')); 
//const sortByDates=document.getElementById("sortDates"); sortByDates.addEventListener("click", sortingBy('date')); 
//const sortByLikes=document.getElementById("sortLikes"); sortByLikes.addEventListener("click", sortingBy('likes')); 


function setListOfAttributes(el, attrs) {
    Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}

function lightboxFactory(dataGal){
    const { id, photographerId, title, image, video, likes, date, price_unit} = dataGal;
    if (dataGal.hasOwnProperty('image')){
        contentPath = `./assets/photographers/${artistFirstName}/${image}`
    }
    else if (dataGal.hasOwnProperty('video')){
        contentPath = `./assets/photographers/${artistFirstName}/${video}`
    }
    else {contentPath ="blank"}
    function getUserCardDOM() {
        const lightboxArticle = document.createElement( 'div' );   
        lightboxArticle.setAttribute("class", "mySlides");        
        lightboxArticle.setAttribute("aria-label", `galerie de ${artistFirstName}`);
              
        if (dataGal.hasOwnProperty('image')){
            const artistImg = document.createElement( 'img' );
            artistImg.setAttribute( 'src', contentPath);  
            artistImg.setAttribute("label", `${title}`);
            artistImg.setAttribute( 'class', 'lightbox-img');  
            artistImg.setAttribute( 'height', maxHeight*.76);  
            lightboxArticle.appendChild(artistImg);  
        }
        else if (dataGal.hasOwnProperty('video')){
            const artistVideo = document.createElement( 'video' );
            let attributes ={width :'95%', height :'auto', controls:'true', muted:'true', label:`${title}`, class:'lightbox-img'};
            setListOfAttributes(artistVideo, attributes);
            lightboxArticle.appendChild(artistVideo);
            const videoSource = document.createElement( 'source' );
            videoSource.setAttribute( 'src', contentPath);
            artistVideo.appendChild(videoSource);
        }

        const titleDiv = document.createElement( 'div' );
        titleDiv.setAttribute( 'class', 'titleDiv');
        titleDiv.textContent = title;
        lightboxArticle.appendChild(titleDiv);

        return (lightboxArticle);
    }
    return { artistFirstName, photographerId, getUserCardDOM }
}



function galerieFactory(dataGal) {
    const { id, photographerId, title, image, video, likes, date, price_unit} = dataGal;
    if (dataGal.hasOwnProperty('image')){
        contentPath = `./assets/photographers/${artistFirstName}/${image}`
    }
    else if (dataGal.hasOwnProperty('video')){
        contentPath = `./assets/photographers/${artistFirstName}/${video}`
    }
    else {contentPath ="blank"}
                
              
            function getUserCardDOM() {
                const articleGalerie = document.createElement( 'article' );   
                articleGalerie.setAttribute("class", "content_card");
                articleGalerie.setAttribute("aria-label", `galerie de ${artistFirstName}`);
                      
                if (dataGal.hasOwnProperty('image')){
                    const artistImg = document.createElement( 'img' );
                    artistImg.setAttribute( 'src', contentPath);  
                    artistImg.setAttribute("label", `${title}`);
                    artistImg.setAttribute("onclick",`openLightbox();currentSlide(${slideNb})`);
                    articleGalerie.appendChild(artistImg);  
                }
                else if (dataGal.hasOwnProperty('video')){
                    const artistVideo = document.createElement( 'video' );
                    let attributes ={width :'350px', height :'300px', controls:'false', muted:'true', label:`${title}`};
                    setListOfAttributes(artistVideo, attributes);
                    artistVideo.setAttribute("onclick",`openLightbox();currentSlide(${slideNb})`);
                    articleGalerie.appendChild(artistVideo);
                    const videoSource = document.createElement( 'source' );
                    videoSource.setAttribute( 'src', contentPath);
                    artistVideo.appendChild(videoSource);
                }

                const titleDiv = document.createElement( 'div' );
                titleDiv.setAttribute( 'class', 'titleDiv');
                articleGalerie.appendChild(titleDiv);

                const mediaTitle = document.createElement( 'div' );
                mediaTitle.setAttribute( 'class', 'media-title');
                mediaTitle.textContent = title;
                titleDiv.appendChild(mediaTitle);
                
                const mediaLikes = document.createElement( 'div' );
                mediaLikes.setAttribute( 'class', 'likes');
                mediaLikes.textContent = likes.toString()+'❤'; 
                titleDiv.appendChild(mediaLikes);
        
                return (articleGalerie);
            }
            return { artistFirstName, photographerId, getUserCardDOM }
        }
function eraseDisplayDataG(){
    const galerieSection = document.querySelector(".galerie-section");
    const lightboxGal = document.querySelector(".lightbox-content");
    const stickyDiv = document.querySelector(".stickyDiv");
    galerieSection.innerHTML="";
    lightboxGal.innerHTML="";
    stickyDiv.innerHTML="";
}
        

/*async*/ function displayDataG(sub) {
    const galerieSection = document.querySelector(".galerie-section");
    const lightboxGal = document.querySelector(".lightbox-content");
    
    sub.forEach((medium) => {
            const mediaCard = galerieFactory(medium);
            const userCardDOM = mediaCard.getUserCardDOM();
            galerieSection.appendChild(userCardDOM);

            const mediaCardLightBox = lightboxFactory(medium);
            const userCardDOMLightBox = mediaCardLightBox.getUserCardDOM();
            lightboxGal.appendChild(userCardDOMLightBox);
            slideNb +=1;
     });
    
    const stickyDiv = document.querySelector(".stickyDiv");
    const artistLikes =document.createElement('div');
    artistLikes.textContent=artistTotalLikes+'❤';
    stickyDiv.appendChild(artistLikes);
    const artistPrice =document.createElement('div');
    artistPrice.textContent=artistTarif;
    stickyDiv.appendChild(artistPrice);
};
                
        // Récupère les datas du photographe choisi et initialise l'affichage
const artist=parseInt(window.location.search.slice(-4,));
console.log(artist);


fetch('./data/photographers.json')
    .then(
        function(responseGal) {
        if (responseGal.status !== 200) {
            console.log('Problem. Status Code: ' +responseGal.status);
            return;
        }
                
        responseGal.json().then(function(dataGal) {
            artistFirstName=dataGal.photographers[artist].name.split(' ')[0];
            const artistNb=dataGal.photographers[artist].id;
            artistTarif=dataGal.photographers[artist].price+'€/jour';
            console.log(artistNb);            
            for (let i=0; i<dataGal.media.length; i++){
                if(dataGal.media[i].photographerId==artistNb){
                    subGalerie.push(dataGal.media[i]);
                    artistTotalLikes += dataGal.media[i].likes;
                    }    
            }
            
            console.log(subGalerie);                  
            displayDataG(subGalerie); 
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });



//--------------------------lightbox------------------------
// Open the Modal
function openLightbox() {
    document.getElementById("lightbox-Modal").style.display = "block";
  }
  
  // Close the Modal
  function closeLightbox() {
    document.getElementById("lightbox-Modal").style.display = "none";
  }
  
  showSlides(slideNb);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideNb += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideNb = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideNb = 1}
    if (n < 0) {slideNb = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideNb-1].style.display = "block";
    dots[slideNb-1].className += " active";
    captionText.innerHTML = dots[slideNb-1].alt;
  }


