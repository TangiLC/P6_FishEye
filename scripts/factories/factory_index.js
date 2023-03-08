
//*** fonction pour attribuer une liste de paire attribut/key à un objet ***/
function setListOfAttributes (el, attrs) {
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
}

//*** fonction pour créer attributs et innertext dans une div affectée à parent **/
function createDiv (elementName, Attribute_key, elemInnerText, parentTarget) {
  Object.keys(Attribute_key).forEach((key) =>
    elementName.setAttribute(key, Attribute_key[key]));
  elementName.innerText = elemInnerText;
  parentTarget.appendChild(elementName);
}


//***** factory de création de l'UserCardDOM pour la page index ********/

function getIndexCardDOM (data, artistNb) {
    const { name, id, city, country, tagline, price, portrait } = data[artistNb];
    const picture = `./assets/photographers/zzportrait/mini-${portrait}.webp`;
    let path = id + artistNb.toString().padStart(4, '0');
    const photographerpath = `photographer.html?id=${path}`;
    const article = document.createElement('article');
  
    const baliseA = document.createElement('a');
    let attributes = { href: photographerpath, alt: `lien vers la page de ${name}` };
    setListOfAttributes(baliseA, attributes);
    article.appendChild(baliseA);
  
    const img = document.createElement('img');
    attributes = { src: picture, alt: `portrait de ${name}` };
    setListOfAttributes(img, attributes);
    baliseA.appendChild(img);
  
    const h2 = document.createElement('h2');
    createDiv(h2, {class: "PhotographerName"}, name, baliseA);
  
    const location = document.createElement('div');
    createDiv(location, {class: "location"}, (city + ', ' + country), baliseA);
  
    const motto = document.createElement('div');
    createDiv(motto, {class: "tagline"}, tagline, baliseA);
  
    const tarif = document.createElement('div');
    createDiv(tarif, {class:"price"}, (price + '€/jour'), baliseA);
  
    return article;
  }
  