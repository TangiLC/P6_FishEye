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
let videoTitle="";
let artistTotalLikes=0;
let artistTarif=0;
let slideNb=1;
let maxHeight=window.screen.height;
const stickyDiv = document.querySelector(".stickyDiv");

function stickyMessage(){    //****** affichage du message sticky nombre de likes et tarif ********/
   
    stickyDiv.innerHTML="";
    const artistLikes =document.createElement('div');
    artistLikes.textContent=artistTotalLikes+'❤';
    stickyDiv.appendChild(artistLikes);
    const artistPrice =document.createElement('div');
    artistPrice.textContent=artistTarif;
    stickyDiv.appendChild(artistPrice);
}


function sortingBy(param){     //***** */ fonction de tri de l'array d'objet selon key ****************/
    if (param=="likes"){subGalerie.sort((a,b) => (a[param] < b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0));}
    else {subGalerie.sort((a,b) => (a[param] > b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0));}
    console.log('sorting by '+param);
    eraseDisplayDataG();
    slideNb=1;
    displayDataG(subGalerie);
  }


function setListOfAttributes(el, attrs) {
    Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}

function createDiv(elementName, elementAttribute, elementAttributeKey, elementInnerText, parentTarget){
    elementName.setAttribute(elementAttribute, elementAttributeKey);
    elementName.innerText=elementInnerText;
    parentTarget.appendChild(elementName);
}

function lightboxFactory(dataGal){
    const { id, photographerId, title, image, video, likes, date, price_unit} = dataGal;
    
    function getUserCardDOM() {
        const lightboxArticle = document.createElement( 'div' ); 
        let attrib={class:'mySlides', 'aria-label':`galerie de ${artistFirstName}`};  
        setListOfAttributes(lightboxArticle, attrib);  
        
        if (dataGal.hasOwnProperty('image')){
            contentPath = `./assets/photographers/${artistFirstName}/${image}`;
            const artistImg = document.createElement( 'img' );
            let attributes ={src:contentPath, label:title, class:'lightbox-img', height:maxHeight*.76};
            setListOfAttributes(artistImg, attributes);
            lightboxArticle.appendChild(artistImg);  
        }
        else if (dataGal.hasOwnProperty('video')){
            contentPath = `./assets/photographers/${artistFirstName}/${video}`;
            const artistVideo = document.createElement( 'video' );
            let attributes ={width :'95%', height :'auto', controls:'True', muted:'true', label:title, class:'lightbox-img'};
            setListOfAttributes(artistVideo, attributes);
            lightboxArticle.appendChild(artistVideo);
            const videoSource = document.createElement( 'source' );
            createDiv(videoSource, 'src', contentPath, '', artistVideo);
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
   
                
              
            function getUserCardDOM() {
                const articleGalerie = document.createElement( 'article' ); 
                let attrib={class:'content_card', 'aria-label':`galerie de ${artistFirstName}`};  
                setListOfAttributes(articleGalerie, attrib);
                                      
                if (dataGal.hasOwnProperty('image')){
                    contentPath = `./assets/photographers/${artistFirstName}/${image}`;
                    videoTitle="";
                    const artistImg = document.createElement( 'img' );
                    let attributes ={src: contentPath, label:title, tabindex:'0',
                        onclick:`openLightbox();currentSlide(${slideNb})`, onkeydown:"if(event.keyCode == 13){event.target.click()}"};
                    setListOfAttributes(artistImg, attributes);
                    articleGalerie.appendChild(artistImg);  
                }
                else if (dataGal.hasOwnProperty('video')){
                    contentPath = `./assets/photographers/${artistFirstName}/${video}`;
                    videoTitle="► ";
                    const artistVideo = document.createElement( 'video' );
                    let attributes ={width :'350px', height :'300px', muted:'true', label:title, tabindex:'0', 
                        onclick:`openLightbox();currentSlide(${slideNb})`, onkeydown:"if(event.keyCode == 13){event.target.click()}"};
                    setListOfAttributes(artistVideo, attributes);
                    articleGalerie.appendChild(artistVideo);
                    const videoSource = document.createElement( 'source' );
                    createDiv(videoSource, 'src', contentPath, '', artistVideo);
                }
                
                const dateDiv= document.createElement( 'div' );
                createDiv(dateDiv, 'class', 'dateDiv', date, articleGalerie);
            
                const titleDiv = document.createElement( 'div' );
                createDiv(titleDiv, 'class', 'titleDiv', '', articleGalerie);
                
                const mediaTitle = document.createElement( 'div' );
                createDiv(mediaTitle, 'class', 'media-title', videoTitle+title, titleDiv);
            
                
                const mediaLikes = document.createElement( 'button' );
                let attributes = {tabindex:'0',onclick:`addOneLike(${id})`, onkeydown:"if(event.keyCode == 13){event.target.click()}"};
                setListOfAttributes(mediaLikes, attributes);
                createDiv(mediaLikes, 'class', 'mediaLikes', likes.toString()+'❤', titleDiv);
                
        
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
     stickyMessage();
}


                
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
const closeLb=document.getElementById("closeLightbox");
function openLightbox() {
    document.getElementById("lightbox-Modal").style.display = "block";
    closeLb.focus({focusVisible: true});
  }
  
  // Close the Modal
  function closeLightbox() {
    document.getElementById("lightbox-Modal").style.display = "none";
  }
  slideNb = 1;
  //showSlides(slideNb);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideNb += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideNb = n);
  }
  
  function showSlides(n) {
    
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideNb = 1}
    if (n < 1) {slideNb = slides.length}
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideNb-1].style.display = "block";
    console.log(slideNb);
  }


//-------------------- ajout de likes ------------------------------------
function addOneLike(arg){
    
    for (let i=0;i<subGalerie.length;i++){
        if (subGalerie[i].id==arg){
            subGalerie[i].likes+=1;
            console.log('+1 like /'+(subGalerie[i].likes-1)+artistTotalLikes);
        }
    }
    artistTotalLikes +=1;
    stickyMessage();
    eraseDisplayDataG();
    slideNb=1;
    displayDataG(subGalerie);
    
}

//-----------------------dropdown menu sort---------------------------------

const dropBtn=document.querySelector('.dropbtn');
const dropDown=document.querySelector('.dropdown-content');
function dropDownClose(){
    console.log('close');
    dropDown.style.display="none";
    dropBtn.style.display="block";
}
function dropDownOpen(){
    console.log('open');
    dropBtn.style.display="none";
    dropDown.style.display="block";
    dropDown.focus();
}
dropBtn.focus();
dropBtn.addEventListener("onmouseover", dropDownOpen());
dropBtn.addEventListener("keydown", function() {
    if ( KeyboardEvent.code ==13 || KeyboardEvent.code==40 ) {dropDownOpen();}});   /*enter=13  down=40*/
dropDown.addEventListener("blur",setTimeout(dropDownClose(),1000));
dropDown.addEventListener("keydown", function() {
    if ( KeyboardEvent.code ==27 || KeyboardEvent.code==38 ) {dropDownOpen();}});   /* esc=27  up=38*/


