//-------------------- ajout de likes ------------------------------------
function addOneLike(arg){
    
    for (let i=0;i<subGalerie.length;i++){
        if (subGalerie[i].id==arg){
            subGalerie[i].likes+=1;
            console.log('+1 like /'+(subGalerie[i].likes-1)+artistTotalLikes);
        }
    }
    artistTotalLikes +=1;
    stickyMessage();
    eraseDisplayDataG();
    slideNb=1;
    displayDataG(subGalerie);
    
}