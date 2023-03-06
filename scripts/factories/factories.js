let maxHeight=window.screen.availHeight ;
var textDate="";

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

              
function getUserCardDOM(dataGal,FirstName,slide_Nb) {
    var {id,photographerId,title,image,video,likes,date,price_unit}= dataGal;
    var artistFirstName = FirstName;
    var slide_Nb = slide_Nb;
    const articleGalerie = document.createElement("article"); 
    var attributes={class:"content_card", "aria-label":`galerie de ${artistFirstName}`};  
    setListOfAttributes(articleGalerie, attributes);
                                      
    if (dataGal.hasOwnProperty("image")){
        textDate=date;
        var contentPath = `./assets/photographers/${artistFirstName}/mini_${image}`;
        var videoTitle="";
        const artistImg = document.createElement("img");
        attributes ={src: contentPath, alt:title, tabindex:"0",
            onclick:`openLightbox();currentSlide(${slide_Nb})`,
            onkeydown:"if(event.keyCode == 13){event.target.click()}"};
            createDiv(artistImg, attributes, "", articleGalerie);            
    }
    else if (dataGal.hasOwnProperty("video")){
        textDate=date+" V I D É O ►";
        var contentPath = `./assets/photographers/${artistFirstName}/${video}`;
        var videoTitle="► ";
        const artistVideo = document.createElement("video");
        attributes ={class:"galerieVideo",
            width :"350px",height :"300px",muted:"true",alt:title,tabindex:"0", 
            onclick:`openLightbox();currentSlide(${slide_Nb})`,
            onkeydown:"if(event.keyCode == 13){event.target.click()}"};
        createDiv(artistVideo, attributes, "", articleGalerie);
        const videoSource = document.createElement("source");
        createDiv(videoSource, {src: contentPath}, "", artistVideo);
    }
    
    const dateDiv= document.createElement("div");
    createDiv(dateDiv, {class:"dateDiv"}, textDate, articleGalerie);
            
    const titleDiv = document.createElement("div");
    createDiv(titleDiv, {class:"titleDiv"}, "", articleGalerie);
                
    const mediaTitle = document.createElement("div");
    createDiv(mediaTitle, {class:"media-title"}, (videoTitle+title), titleDiv);
            
    const mediaLikes = document.createElement("button");
    attributes = {class: "mediaLikes", tabindex:"0",
        onclick: `addOneLike(${id})`, ariaLabel: "nombre de likes",
        onkeydown:"if(event.keyCode == 13){event.target.click()}"};
    createDiv(mediaLikes, attributes, (likes.toString()+"❤"), titleDiv);
                
    return (articleGalerie);
}

//***** factory de création de l"UserCardDOM pour lightbox ********/

    
function getUserCardDOMLightBox(dataGal,FirstName,slide_Nb) {
    var title = dataGal.title;
    var image = dataGal.image;
    var video = dataGal.video;
    //var {id,photographerId,title,image,video,likes,date,price_unit}= dataGal;
    var artistFirstName = FirstName;
    var slide_Nb = slide_Nb;
    const lightboxArticle = document.createElement("div"); 
    let attrib={class:"mySlides","aria-label":`galerie de ${artistFirstName}`};  
    setListOfAttributes(lightboxArticle, attrib);  
        
    if (dataGal.hasOwnProperty("image")){
        var contentPath = `./assets/photographers/${artistFirstName}/${image}`;
        const artistImg = document.createElement("img");
        var attributes ={src:contentPath, alt:title, 
               class:"lightbox-img", height:(maxHeight*0.8)};
        createDiv(artistImg, attributes, "", lightboxArticle);
    }
    else if (dataGal.hasOwnProperty("video")){
        var contentPath = `./assets/photographers/${artistFirstName}/${video}`;
        const artistVideo = document.createElement("video");
        var attributes ={width :"95%", height :"auto", tabindex:"0",
            controls:"true", muted:"true", label:title, class:"lightbox-img"};
        createDiv(artistVideo, attributes, "", lightboxArticle);
        const videoSource = document.createElement("source");
        createDiv(videoSource, {src: contentPath}, "", artistVideo);
    }

    const titleDiv = document.createElement("div");
    createDiv(titleDiv, {class:"titleDiv"}, title, lightboxArticle);

    return (lightboxArticle);
}