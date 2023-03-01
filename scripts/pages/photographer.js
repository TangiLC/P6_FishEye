/*structure photographers.json{
			"name": string,
			"id": nb,
			"city": string,
			"country": string,
			"tagline": string,
			"price": nb,
			"portrait": string
		},*/
let attribs={};
function setListOfAttribs(el, attrs) {
    Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}
        
function attribDiv(elementName, elementAttribute, elementAttributeKey, elementInnerText, parentTarget){
    elementName.setAttribute(elementAttribute, elementAttributeKey);
    elementName.innerText=elementInnerText;
    parentTarget.appendChild(elementName);
}

function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
        
    const picture = `./assets/photographers/zzportrait/mini_${portrait}`;
        
        
    function getUserCardDOM() {
        const article = document.createElement( 'article' );   
        attribs={class:"galerie-header", ariaLabel:`galerie de ${name}`};
        setListOfAttribs(article, attribs);

        const leftCol = document.createElement( 'div' );
        attribDiv(leftCol, 'class', 'leftCol', "", article);

        const middleCol = document.createElement( 'div' );
        attribDiv(middleCol, 'class', 'middleCol', "", article);

        const rightCol = document.createElement( 'div' );
        attribDiv(rightCol, 'class', 'rightCol', "", article);

        const h2 = document.createElement( 'h2' );
        attribDiv(h2, 'class', 'phName', name, leftCol);
        
        const location = document.createElement( 'div' );
        attribDiv(location, 'class', 'location', (city+', '+country), leftCol);
        
        
        const motto = document.createElement( 'div' );
        attribDiv(motto, 'class', 'tagline', tagline, leftCol);
       
        
        const displayModal = document.createElement( 'button');
        //attribs={'onclick':'displayModal()', ariaLabel:"ouverture du formulaire"};
        //setListOfAttribs(displayModal, attribs);
        displayModal.setAttribute("onclick","displayModal()");
        displayModal.setAttribute("aria-label","ouverture du formulaire");
        attribDiv(displayModal, 'class', 'contact_button', "Contactez-moi", middleCol);
        

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("label", name);
        rightCol.appendChild(img);

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
const artistId=parseInt(window.location.search.slice(-4,));
console.log(artistId)

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
    const loader=document.querySelector('.lds-grid')
    mainBg.style.display = "none";
    setTimeout(function(){loader.style.display="none";mainBg.style.display = "block";},2000);
}
loader();