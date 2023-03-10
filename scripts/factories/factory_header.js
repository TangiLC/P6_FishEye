
function getHeaderCardDOM(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `./assets/photographers/zzportrait/mini-${portrait}.webp`;
    const loaderGrid=document.querySelector('.lds-grid');
    let j;    
    for(j=0; j<9; j++){        //création de 9 cases animation css
        var loaderImg=document.createElement('img');
        createDiv(loaderImg, {src: picture, alt:""}, "", loaderGrid);
    }

    const article = document.createElement( 'article' );   
    setListOfAttributes(article, {class:"galerie-header", ariaLabel:`galerie de ${name}`, tabIndex:"0"});

    const leftCol = document.createElement( 'div' );
    createDiv(leftCol, {class: 'leftCol'}, "", article);

    const middleCol = document.createElement( 'div' );
    createDiv(middleCol, {class: 'middleCol'}, "", article);

    const rightCol = document.createElement( 'div' );
    createDiv(rightCol, {class: 'rightCol'}, "", article);

    const h2 = document.createElement( 'h2' );
    createDiv(h2, {class: 'phName'}, name, leftCol);
        
    const location = document.createElement( 'div' );
    createDiv(location, {class: 'location'}, (city+', '+country), leftCol);
         
    const motto = document.createElement( 'div' );
    createDiv(motto, {class: 'tagline'}, tagline, leftCol);
        
    const displayModal = document.createElement( 'button');
    createDiv(displayModal, {class:'contact_button','onclick':'displayModal()',
            ariaLabel:"ouverture du formulaire"}, "Contactez-moi", middleCol);
        
    const img = document.createElement( 'img' );
    createDiv(img, {src:picture, alt:name}, "", rightCol);

    const tarif = document.createElement( 'div' );
    tarif.setAttribute( 'class', 'price anchored');
    tarif.textContent = price.toString()+'€/jour';
    
    return (article);
}