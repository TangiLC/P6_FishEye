/*structure photographers.json{
  "name": string,
  "id": nb,
  "city": string,
  "country": string,
  "tagline": string,
  "price": nb,
  "portrait": string}*/
let artistNb = 0
var attributes = {}


/*async*/ function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const userCardDOM = getIndexCardDOM(photographers,artistNb)
    photographersSection.appendChild(userCardDOM)
    artistNb++
  })
}

// Récupère les datas des photographes et initialise l'affichage
fetch('./data/photographers.json')
  .then(function (response) {
    if (response.status !== 200) {
      console.log('Problem. Status Code: ' + response.status)
      return
    }

    response.json().then(function (data) {
      displayData(data.photographers)
    })
  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err)
  })
