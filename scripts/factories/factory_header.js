function setListOfAttribs(elem, attrs) {
    Object.keys(attrs).forEach((key) => elem.setAttribute(key, attrs[key]));
}
        
function attribAppendDiv(elementName, elementAttributes_keys, elementInnerText, parentTarget){
    Object.keys(elementAttributes_keys).forEach((key) =>
        elementName.setAttribute(key, elementAttributes_keys[key]));
    elementName.innerText=elementInnerText;
    parentTarget.appendChild(elementName);
}

function getHeaderCardDOM(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `./assets/photographers/zzportrait/mini_${portrait}`;
    const loaderGrid=document.querySelector('.lds-grid');
        
    for(var j=0;j<9;j++){        //création de 9 cases animation css
        var loaderImg=document.createElement('img');
        attribAppendDiv(loaderImg, {src: picture, alt:`mini anim ${j}/9`}, "", loaderGrid);
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