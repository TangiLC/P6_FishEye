/*structure media.json{
    "id":nb,
    "photographerId":nb,
    "title":string,
    "image":string url,
   **or "video":string url,
    "likes":nb,
    "date":string format yyyy-mm-dd,
    "price":nb}*/

let artistFirstName="Mimi";
let subGalerie=[];
let contentPath="";
let videoTitle="";
let textDate="";
let artistTotalLikes=0;
let artistTarif=0;
let slideNb=1;
let maxHeight=window.screen.height;
let previousId=[];
var attributes={};

const stickDiv = document.querySelector(".stickyDiv");

//****** affichage du message sticky nombre de likes et tarif ******/
function stickyMessage(){
    stickDiv.innerHTML="";
    const artistLikes =document.createElement("div");
    artistLikes.textContent=artistTotalLikes+"❤";
    stickDiv.appendChild(artistLikes);
    const artistPrice =document.createElement("div");
    artistPrice.textContent=artistTarif;
    stickDiv.appendChild(artistPrice);
}

//***** fonction de tri de l"array d"objet selon key **************/
function sortingBy(param){
    if (param=="likes"){
        subGalerie.sort((a,b) =>
        (a[param] < b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0));}
    else {
        subGalerie.sort((a,b) =>
        (a[param] > b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0));}
    console.log("sorting by "+param);
    eraseDisplayDataG();
    slideNb=1;
    displayDataG(subGalerie);
  }
//*** fonction pour attribuer une liste de paire attribut/key à un objet ***/
function setListOfAttributes(el, attrs) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
}

function createDiv(elementName, Attribute_key, elemInnerText, parentTarget){
    Object.keys(Attribute_key).forEach(
        (key) => elementName.setAttribute(key, Attribute_key[key]));
    elementName.innerText=elemInnerText;
    parentTarget.appendChild(elementName);
}

//***** factory principale de création de l"UserCardDOM ********/
function galerieFactory(dataGal) {
    const {id,photographerId,title,image,video,likes,date,price_unit}= dataGal;
              
            function getUserCardDOM() {
                const articleGalerie = document.createElement("article"); 
                var attributes={class:"content_card", "aria-label":`galerie de ${artistFirstName}`};  
                setListOfAttributes(articleGalerie, attributes);
                                      
                if (dataGal.hasOwnProperty("image")){
                    contentPath = `./assets/photographers/${artistFirstName}/mini_${image}`;
                    videoTitle="";
                    const artistImg = document.createElement("img");
                    var attributes ={src: contentPath, alt:title, tabindex:"0",
                        onclick:`openLightbox();currentSlide(${slideNb})`,
                        onkeydown:"if(event.keyCode == 13){event.target.click()}"};
                    createDiv(artistImg, attributes, "", articleGalerie);
                    
                }
                else if (dataGal.hasOwnProperty("video")){
                    contentPath = `./assets/photographers/${artistFirstName}/${video}`;
                    videoTitle="► ";
                    const artistVideo = document.createElement("video");
                    var attributes ={
                        width :"350px",height :"300px",muted:"true",alt:title,tabindex:"0", 
                        onclick:`openLightbox();currentSlide(${slideNb})`,
                        onkeydown:"if(event.keyCode == 13){event.target.click()}"};
                    createDiv(artistVideo, attributes, "", articleGalerie);
                    const videoSource = document.createElement("source");
                    createDiv(videoSource, {src: contentPath}, "", artistVideo);
                }
                if (dataGal.hasOwnProperty("video")){textDate=date+" V I D É O ►";}
                else {textDate=date;}
                const dateDiv= document.createElement("div");
                createDiv(dateDiv, {class:"dateDiv"}, textDate, articleGalerie);
            
                const titleDiv = document.createElement("div");
                createDiv(titleDiv, {class:"titleDiv"}, "", articleGalerie);
                
                const mediaTitle = document.createElement("div");
                createDiv(mediaTitle, {class:"media-title"}, (videoTitle+title), titleDiv);
            
                
                const mediaLikes = document.createElement("button");
                var attributes = {
                    class: "mediaLikes", tabindex:"0",onclick:`addOneLike(${id})`,
                    ariaLabel:"nombre de likes",
                    onkeydown:"if(event.keyCode == 13){event.target.click()}"};
                createDiv(mediaLikes, attributes, (likes.toString()+"❤"), titleDiv);
                
                return (articleGalerie);
            }
            return { artistFirstName, photographerId, getUserCardDOM };
}

function lightboxFactory(dataGal){
    const {id,photographerId,title,image,video,likes,date,price_unit}= dataGal;
    
    function getUserCardDOM() {
        const lightboxArticle = document.createElement("div"); 
        let attrib={class:"mySlides","aria-label":`galerie de ${artistFirstName}`};  
        setListOfAttributes(lightboxArticle, attrib);  
        
        if (dataGal.hasOwnProperty("image")){
            contentPath = `./assets/photographers/${artistFirstName}/${image}`;
            const artistImg = document.createElement("img");
            let attributes ={src:contentPath, alt:title, 
                   class:"lightbox-img", height:(maxHeight*0.76)};
            createDiv(artistImg, attributes, "", lightboxArticle);
        }
        else if (dataGal.hasOwnProperty("video")){
            contentPath = `./assets/photographers/${artistFirstName}/${video}`;
            const artistVideo = document.createElement("video");
            let attributes ={width :"95%", height :"auto", tabindex:"0",
               controls:"True", muted:"true", label:title, class:"lightbox-img"};
            createDiv(artistVideo, attributes, "", lightboxArticle);
            const videoSource = document.createElement("source");
            createDiv(videoSource, {src: contentPath}, "", artistVideo);
        }

        const titleDiv = document.createElement("div");
        createDiv(titleDiv, {class:"titleDiv"}, title, lightboxArticle);

        return (lightboxArticle);
    }
    return { artistFirstName, photographerId, getUserCardDOM };
}

        
function eraseDisplayDataG(){
    const galerieSection = document.querySelector(".galerie-section");
    const lightboxGal = document.querySelector(".lightbox-content");
    galerieSection.innerHTML="";
    lightboxGal.innerHTML="";
    stickDiv.innerHTML="";
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


                
        // Récupère les datas du photographe choisi et initialise l"affichage
const artist=parseInt(window.location.search.slice(-4,));
console.log(artist);


fetch("./data/photographers.json")
    .then(
        function(responseGal) {
        if (responseGal.status !== 200) {
            console.log("Problem. Status Code: "+responseGal.status);
            return;
        }
                
        responseGal.json().then(function(dataGal) {
            artistFirstName=dataGal.photographers[artist].name.split(" ")[0];
            const artistNb=dataGal.photographers[artist].id;
            artistTarif=dataGal.photographers[artist].price+"€/jour";
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
        console.log("Fetch Error :-S", err);
    });



//******************** lightbox  ********************************************/
// Open lightbox
const nextArrow=document.querySelector(".next");
function openLightbox() {
    document.getElementById("lightbox-Modal").style.display = "block";
    nextArrow.focus({focusVisible: true});
  }
  
  // Close lightbox
  function closeLightbox() {
    document.getElementById("lightbox-Modal").style.display = "none";
  }
  slideNb = 1;
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideNb += n);
  }
  
  //affichage du slide n
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


//********************* ajout de likes **********************************/
function addOneLike(arg){
    
    if(!previousId.includes(arg)){               
        for (let i=0;i<subGalerie.length;i++){
            if (subGalerie[i].id==arg){
                subGalerie[i].likes+=1;
                console.log("+1 like /"+(subGalerie[i].likes-1)+artistTotalLikes);
                previousId.push(arg);
                console.log(previousId);
            }
        }
        artistTotalLikes +=1;
        stickyMessage();
        eraseDisplayDataG();
        slideNb=1;
        displayDataG(subGalerie);
    }
    else{alert("❤ Vous avez déjà voté ❤")}
}
