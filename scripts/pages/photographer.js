
        
/*async*/ function displayData(photographer) {

    //appel de la factory getHeaderCardDOM dans ./scripts/factories/factory_header.js
    const photographersSection = document.querySelector(".photograph-header");
    const headerCardDOM = getHeaderCardDOM(photographer);
    photographersSection.appendChild(headerCardDOM);
    
};
        
// Récupère les datas des photographes et initialise l'affichage
// le ?= (search) de la barre d'adresse contient l'id de l'artiste + son index en 4 derniers chiffres
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
        const footerBg=document.getElementById('footer');
        const loaderBg=document.querySelector('.lds-grid');
        mainBg.style.display = "none";
        footerBg.style.display = "none";
        setTimeout(function(){loaderBg.style.display="none"; mainBg.style.display = "block";footerBg.style.display = "block";},3000);
}
loader();