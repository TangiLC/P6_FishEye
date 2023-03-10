//*** fonction pour attribuer une liste de paire attribut/key à un objet ***/
function setListOfAttributes(el, attrs) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  }
  
  //*** fonction pour créer attributs et innertext dans une div affectée à parent **/
  function createDiv(elementName, Attribute_key, elemInnerText, parentTarget) {
    Object.keys(Attribute_key).forEach((key) =>
      elementName.setAttribute(key, Attribute_key[key])
    );
    elementName.innerText = elemInnerText;
    parentTarget.appendChild(elementName);
  }
  