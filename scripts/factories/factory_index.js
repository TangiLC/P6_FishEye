

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
  