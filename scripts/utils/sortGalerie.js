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
let textDate="";
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
            let attributes ={src:contentPath, alt:title, class:'lightbox-img', height:maxHeight*.76};
            setListOfAttributes(artistImg, attributes);
            lightboxArticle.appendChild(artistImg);  
        }
        else if (dataGal.hasOwnProperty('video')){
            contentPath = `./assets/photographers/${artistFirstName}/${video}`;
            const artistVideo = document.createElement( 'video' );
            let attributes ={width :'95%', height :'auto', tabindex:'0', controls:'True', muted:'true', label:title, class:'lightbox-img'};
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
                    let attributes ={src: contentPath, alt:title, tabindex:'0',
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
                if (dataGal.hasOwnProperty('video')){textDate=date+' V I D É O ►'}
                else {textDate=date}
                const dateDiv= document.createElement( 'div' );
                createDiv(dateDiv, 'class', 'dateDiv', textDate, articleGalerie);
            
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





