// Open lightbox
const closeLb=document.getElementById("closeLightbox");
function openLightbox() {
    document.getElementById("lightbox-Modal").style.display = "block";
    closeLb.focus({focusVisible: true});
  }
  
  // Close lightbox
  function closeLightbox() {
    document.getElementById("lightbox-Modal").style.display = "none";
  }
  slideNb = 1;
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideNb += n);
  }
  
  //affichage du slide n
  function currentSlide(n) {
    showSlides(slideNb = n);
  }
  
  function showSlides(n) {
    
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideNb = 1}
    if (n < 1) {slideNb = slides.length}
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideNb-1].style.display = "block";
    console.log(slideNb);
  }


