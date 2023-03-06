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
let artistTotalLikes=0;
let artistTarif=0;
let slideNb=1;
let previousId=[];    //liste des id des likes précédents pour interdire de like x2

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


//***** fonction efface et affiche à nouveau la galerie ***********/        
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
            const userCardDOM = getUserCardDOM(medium,artistFirstName,slideNb);
            galerieSection.appendChild(userCardDOM);

            const userCardDOMLightBox = getUserCardDOMLightBox(medium,artistFirstName,slideNb);
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
    else{alert("❤ Vous avez déjà voté ❤")};
}
