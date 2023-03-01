/*structure photographers.json{
			"name": string,
			"id": nb,
			"city": string,
			"country": string,
			"tagline": string,
			"price": nb,
			"portrait": string
		},*/
let artistNb=0;
let attributes={};

function setListOfAttributes(el, attrs) {
    Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}

function createDiv(elementName, elementAttribute, elementAttributeKey, elementInnerText, parentTarget){
    elementName.setAttribute(elementAttribute, elementAttributeKey);
    elementName.innerText=elementInnerText;
    parentTarget.appendChild(elementName);
}

function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `./assets/photographers/zzportrait/mini_${portrait}`;
    let path=id+(artistNb.toString()).padStart(4, '0');
    const photographerpath = `photographer.html?id=${path}`;


    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const baliseA = document.createElement('a');
        attributes={href:photographerpath, "aria-label":`lien vers la page de ${name}`}
        setListOfAttributes(baliseA, attributes);
        article.appendChild(baliseA);

       
        const img = document.createElement( 'img' );
        attributes={src:picture, alt:name};
        setListOfAttributes(img, attributes);
        baliseA.appendChild(img);

        const h2 = document.createElement( 'h2' );
        createDiv(h2, 'class', 'PhotographerName', name, baliseA);
        

        const location = document.createElement( 'div' );
        createDiv(location, 'class', 'location', (city+', '+country), baliseA);
        

        const motto = document.createElement( 'div' );
        createDiv(motto, 'class', 'tagline', tagline, baliseA);
        

        const tarif = document.createElement( 'div' );
        createDiv(tarif, 'class', 'price', (price.toString()+'€/jour'), baliseA);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    
    photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            artistNb++;
     });
};

// Récupère les datas des photographes et initialise l'affichage
fetch('./data/photographers.json')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Problem. Status Code: ' +response.status);
            return;
        }

        response.json().then(function(data) {
            displayData(data.photographers); 
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
    
