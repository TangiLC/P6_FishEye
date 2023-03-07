/*structure photographers.json{
"name": string,
"id": nb,
"city": string,
"country": string,
"tagline": string,
"price": nb,
"portrait": string}*/

const loaderGrid=document.querySelector('.lds-grid');

function setListOfAttribs(elem, attrs) {
    Object.keys(attrs).forEach((key) => elem.setAttribute(key, attrs[key]));
}
        
function attribAppendDiv(elementName, elementAttributes_keys, elementInnerText, parentTarget){
    Object.keys(elementAttributes_keys).forEach((key) =>
        elementName.setAttribute(key, elementAttributes_keys[key]));
    elementName.innerText=elementInnerText;
    parentTarget.appendChild(elementName);
}

function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
        
    const picture = `./assets/photographers/zzportrait/mini_${portrait}`;
        
        
    function getUserCardDOM() {
        
        for(var j=0;j<9;j++){
            var loaderImg=document.createElement('img');
            attribAppendDiv(loaderImg, {src: picture, alt:'mini css anim'}, "", loaderGrid);
        }

        const article = document.createElement( 'article' );   
        setListOfAttribs(article, {class:"galerie-header", ariaLabel:`galerie de ${name}`});

        const leftCol = document.createElement( 'div' );
        attribAppendDiv(leftCol, {class: 'leftCol'}, "", article);

        const middleCol = document.createElement( 'div' );
        attribAppendDiv(middleCol, {class: 'middleCol'}, "", article);

        const rightCol = document.createElement( 'div' );
        attribAppendDiv(rightCol, {class: 'rightCol'}, "", article);

        const h2 = document.createElement( 'h2' );
        attribAppendDiv(h2, {class: 'phName'}, name, leftCol);
        
        const location = document.createElement( 'div' );
        attribAppendDiv(location, {class: 'location'}, (city+', '+country), leftCol);
         
        const motto = document.createElement( 'div' );
        attribAppendDiv(motto, {class: 'tagline'}, tagline, leftCol);
        
        const displayModal = document.createElement( 'button');
        attribAppendDiv(displayModal, {class:'contact_button','onclick':'displayModal()',
            ariaLabel:"ouverture du formulaire"}, "Contactez-moi", middleCol);
        

        const img = document.createElement( 'img' );
        attribAppendDiv(img, {src:picture, alt:name}, "", rightCol);

        const tarif = document.createElement( 'div' );
        tarif.setAttribute( 'class', 'price anchored');
        tarif.textContent = price.toString()+'€/jour';
    

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
        
/*async*/ function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    
};
        
// Récupère les datas des photographes et initialise l'affichage
const artistId=parseInt(window.location.search.slice(-4));
console.log(artistId);

fetch('./data/photographers.json')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Problem. Status Code: ' +response.status);
            return;
        }
        
        response.json().then(function(data) {
            console.log(data.photographers[artistId]);
            displayData(data.photographers[artistId]); 
            const contactMe = document.querySelector(".contactMe");
            contactMe.textContent = contactMe.textContent.concat("\n",data.photographers[artistId].name);
            
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

function loader(){
        const mainBg=document.getElementById('main');
        mainBg.style.display = "none";
        setTimeout(function(){loaderGrid.style.display="none"; mainBg.style.display = "block";},3000);
}
loader();